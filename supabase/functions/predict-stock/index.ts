import { createClient } from "npm:@supabase/supabase-js@2.39.0";
import * as tf from "npm:@tensorflow/tfjs@4.17.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

async function fetchStockData(symbol: string) {
  const apiKey = Deno.env.get("ALPHA_VANTAGE_API_KEY");
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
  );
  const data = await response.json();
  return data["Time Series (Daily)"];
}

async function processData(data: any) {
  const prices = Object.values(data).map((day: any) => parseFloat(day["4. close"]));
  const reversedPrices = prices.reverse();
  
  // Normalize data
  const min = Math.min(...reversedPrices);
  const max = Math.max(...reversedPrices);
  const normalizedPrices = reversedPrices.map(
    price => (price - min) / (max - min)
  );
  
  // Prepare sequences
  const sequenceLength = 60;
  const X = [];
  const y = [];
  
  for (let i = sequenceLength; i < normalizedPrices.length; i++) {
    X.push(normalizedPrices.slice(i - sequenceLength, i));
    y.push(normalizedPrices[i]);
  }
  
  return {
    X: tf.tensor3d(X, [X.length, sequenceLength, 1]),
    y: tf.tensor2d(y, [y.length, 1]),
    min,
    max
  };
}

async function createModel(inputShape: number[]) {
  const model = tf.sequential();
  
  model.add(tf.layers.lstm({
    units: 50,
    returnSequences: true,
    inputShape: inputShape
  }));
  
  model.add(tf.layers.lstm({
    units: 50,
    returnSequences: false
  }));
  
  model.add(tf.layers.dense({ units: 1 }));
  
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'meanSquaredError'
  });
  
  return model;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const symbol = url.searchParams.get("symbol");

    if (!symbol) {
      throw new Error("Symbol parameter is required");
    }

    // Fetch historical data
    const stockData = await fetchStockData(symbol);
    
    // Process data
    const { X, y, min, max } = await processData(stockData);
    
    // Create and train model
    const model = await createModel([60, 1]);
    await model.fit(X, y, {
      epochs: 5,
      batchSize: 32,
      shuffle: true
    });
    
    // Make prediction
    const lastSequence = X.slice([X.shape[0] - 1]);
    const prediction = model.predict(lastSequence);
    const predictionValue = await prediction.data();
    
    // Denormalize prediction
    const denormalizedPrediction = predictionValue[0] * (max - min) + min;
    
    // Format response
    const response = {
      symbol,
      prediction: denormalizedPrediction.toFixed(2),
      timestamp: new Date().toISOString()
    };

    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});