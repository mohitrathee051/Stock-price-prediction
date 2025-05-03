import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface ChartData {
  date: string;
  price: number;
  volume: number;
}

interface StockChartProps {
  historical: ChartData[];
  prediction: ChartData[];
}

const StockChart: React.FC<StockChartProps> = ({ historical, prediction }) => {
  const [showVolume, setShowVolume] = useState(true);
  const allData = [...historical, ...prediction];
  const minPrice = Math.min(...allData.map(d => d.price));
  const maxPrice = Math.max(...allData.map(d => d.price));
  const priceRange = maxPrice - minPrice;
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isPrediction = prediction.some(d => d.date === label);
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Price: ${payload[0].value.toFixed(2)}
          </p>
          {showVolume && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Volume: {payload[1]?.value.toLocaleString()}
            </p>
          )}
          {isPrediction && (
            <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
              Predicted Value
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Price History & Predictions
        </h3>
        <button
          onClick={() => setShowVolume(!showVolume)}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {showVolume ? 'Hide Volume' : 'Show Volume'}
        </button>
      </div>
      
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={allData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              tickLine={{ stroke: '#6B7280' }}
              minTickGap={50}
            />
            <YAxis
              yAxisId="price"
              domain={[minPrice - priceRange * 0.1, maxPrice + priceRange * 0.1]}
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              tickLine={{ stroke: '#6B7280' }}
            />
            {showVolume && (
              <YAxis
                yAxisId="volume"
                orientation="right"
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
                tickLine={{ stroke: '#6B7280' }}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="price"
              type="monotone"
              data={historical}
              dataKey="price"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
              name="Historical"
            />
            <Line
              yAxisId="price"
              type="monotone"
              data={prediction}
              dataKey="price"
              stroke="#10B981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Prediction"
            />
            {showVolume && (
              <Area
                yAxisId="volume"
                type="monotone"
                dataKey="volume"
                stroke="#6B7280"
                fill="#6B7280"
                fillOpacity={0.1}
                name="Volume"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;