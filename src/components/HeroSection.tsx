import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  scrollToFeatures: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToFeatures }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mt-20 md:mt-0 animate-fade-in">
            Stock Price Prediction with LSTM <span className="inline-block animate-pulse-slow">📈💹</span>
          </h1>
          
          <p className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl animate-slide-up">
            Predict the next closing price of top stocks like Apple, Google, Tesla, and more using deep learning (LSTM). 
            Backed by real-time financial data and trained on historical trends.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto px-8 py-3 text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300 shadow-md hover:shadow-lg">
              Get Started
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-3 text-lg font-medium rounded-md text-primary-700 dark:text-primary-400 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-primary-300 dark:border-primary-800 transition-colors duration-300 shadow-md hover:shadow-lg">
              Login
            </Link>
          </div>
          
          <button 
            onClick={scrollToFeatures}
            className="mt-16 p-2 rounded-full bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 shadow-md hover:shadow-lg animate-bounce"
            aria-label="Scroll to features"
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;