import { createClient } from '@supabase/supabase-js';

interface PredictionResult {
  data: [string, string]; // [text result, chart data]
}

export const stocks = [
  { id: 'AAPL', name: 'Apple', emoji: '📱', color: 'bg-blue-500' },
  { id: 'GOOGL', name: 'Google', emoji: '🔍', color: 'bg-red-500' },
  { id: 'TSLA', name: 'Tesla', emoji: '🚗', color: 'bg-green-500' },
  { id: 'AMZN', name: 'Amazon', emoji: '📦', color: 'bg-yellow-500' },
  { id: 'MSFT', name: 'Microsoft', emoji: '💻', color: 'bg-indigo-500' },
  { id: 'META', name: 'Meta', emoji: '👥', color: 'bg-blue-400' },
  { id: 'NFLX', name: 'Netflix', emoji: '🎬', color: 'bg-red-600' },
  { id: 'NVDA', name: 'NVIDIA', emoji: '🎮', color: 'bg-green-600' }
];

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const predictStockPrice = async (stockId: string): Promise<PredictionResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('predict-stock', {
      body: { symbol: stockId }
    });

    if (error) throw error;

    const prediction = data.prediction;
    const historicalData = generateMockData(100, true);
    const predictionData = generateMockData(30, false, prediction);

    return {
      data: [
        `Predicted price: $${prediction}`,
        JSON.stringify({
          historical: historicalData,
          prediction: predictionData
        })
      ]
    };
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};

// Helper function to generate mock data
const generateMockData = (days: number, isHistorical: boolean = true, targetPrice?: number) => {
  const data = [];
  let price = 100;
  const now = new Date();
  const startDate = isHistorical ? -days : 1;
  const endDate = isHistorical ? 0 : days;
  
  if (targetPrice && !isHistorical) {
    const startPrice = price;
    const priceStep = (targetPrice - startPrice) / days;
    
    for (let i = startDate; i <= endDate; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      price += priceStep + (Math.random() * 2 - 1); // Add some randomness
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 500000,
      });
    }
  } else {
    // Original mock data generation for historical data
    for (let i = startDate; i <= endDate; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);
      
      const trend = isHistorical ? 0 : 0.002;
      price = price * (1 + (Math.random() * 0.04 - 0.02 + trend));
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat(price.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 500000,
      });
    }
  }
  
  return data;
};