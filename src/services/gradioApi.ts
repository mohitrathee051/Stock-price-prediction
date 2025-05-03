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

// Generate mock data for the chart
const generateMockData = (days: number, isHistorical: boolean = true) => {
  const data = [];
  let price = 100;
  const now = new Date();
  const startDate = isHistorical ? -days : 1;
  const endDate = isHistorical ? 0 : days;
  
  for (let i = startDate; i <= endDate; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() + i);
    
    // Add some random variation with trend
    const trend = isHistorical ? 0 : 0.002; // Slight upward trend for predictions
    price = price * (1 + (Math.random() * 0.04 - 0.02 + trend));
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  return data;
};

export const predictStockPrice = async (stockId: string): Promise<PredictionResult> => {
  // Simulate API call latency
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock historical data (100 days) and prediction (30 days)
  const historicalData = generateMockData(100, true);
  const predictionData = generateMockData(30, false);
  
  // Calculate price changes
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