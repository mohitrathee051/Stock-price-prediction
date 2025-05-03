import React from 'react';
import FeatureCard from './FeatureCard';
import { LineChart, Brain, Clock, Lock, BarChart4, Users } from 'lucide-react';

interface FeaturesSectionProps {
  featuresRef: React.RefObject<HTMLDivElement>;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ featuresRef }) => {
  return (
    <div ref={featuresRef} className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Advanced Stock Prediction Features
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our LSTM model provides accurate stock price predictions based on historical data and market trends.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Brain size={24} />}
            title="LSTM Deep Learning"
            description="Utilizes Long Short-Term Memory neural networks to capture complex patterns in stock market data."
          />
          <FeatureCard 
            icon={<LineChart size={24} />}
            title="Real-time Analysis"
            description="Get up-to-date predictions based on the latest market data from trusted financial sources."
          />
          <FeatureCard 
            icon={<Clock size={24} />}
            title="Historical Patterns"
            description="Learn from years of historical stock data to identify recurring patterns and trends."
          />
          <FeatureCard 
            icon={<BarChart4 size={24} />}
            title="Visual Insights"
            description="Clear visualizations of predicted price movements and confidence intervals."
          />
          <FeatureCard 
            icon={<Lock size={24} />}
            title="Secure Access"
            description="Your data and predictions are protected with industry-standard security protocols."
          />
          <FeatureCard 
            icon={<Users size={24} />}
            title="Community Insights"
            description="Compare your predictions with other users and see consensus forecasts."
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;