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

// Static stock data
const stockData = {
  'AAPL': { basePrice: 180, trend: 0.015 },
  'GOOGL': { basePrice: 140, trend: 0.012 },
  'TSLA': { basePrice: 240, trend: 0.02 },
  'AMZN': { basePrice: 145, trend: 0.018 },
  'MSFT': { basePrice: 370, trend: 0.014 },
  'META': { basePrice: 330, trend: 0.016 },
  'NFLX': { basePrice: 485, trend: 0.019 },
  'NVDA': { basePrice: 470, trend: 0.017 }
};

// Generate consistent data for a stock
const generateStockData = (stockId: string, days: number, isHistorical: boolean = true) => {
  const data = [];
  const { basePrice, trend } = stockData[stockId];
  const now = new Date();
  const startDate = isHistorical ? -days : 1;
  const endDate = isHistorical ? 0 : days;
  
  for (let i = startDate; i <= endDate; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    // Calculate price using a consistent formula
    const dayEffect = i * trend;
    const price = basePrice * (1 + dayEffect);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2)),
      volume: 1000000 + (i * 10000), // Consistent volume progression
    });
  }
  
  return data;
};

export const predictStockPrice = async (stockId: string): Promise<PredictionResult> => {
  // Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const historicalData = generateStockData(stockId, 100, true);
  const predictionData = generateStockData(stockId, 30, false);
  
  const lastPrice = historicalData[historicalData.length - 1].price;
  const nextDayPrice = predictionData[0].price;
  const thirtyDayPrice = predictionData[predictionData.length - 1].price;
  
  const nextDayChange = ((nextDayPrice - lastPrice) / lastPrice * 100).toFixed(2);
  const thirtyDayChange = ((thirtyDayPrice - lastPrice) / lastPrice * 100).toFixed(2);
  
  const prediction = `Next day: ${nextDayChange}% ${parseFloat(nextDayChange) > 0 ? '📈' : '📉'} | 30-day: ${thirtyDayChange}% ${parseFloat(thirtyDayChange) > 0 ? '📈' : '📉'}`;
  
  return {
    data: [
      prediction,
      JSON.stringify({
        historical: historicalData,
        prediction: predictionData
      })
    ]
  };
};