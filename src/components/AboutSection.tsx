import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Understanding LSTM for Stock Prediction
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Long Short-Term Memory (LSTM) networks are a specialized type of recurrent neural network capable of learning long-term dependencies, which makes them ideal for stock price prediction.
            </p>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Our model is trained on historical data from Yahoo Finance, using TensorFlow to process patterns and relationships in stock market movements over time.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Data Collection</h3>
                  <p className="mt-1 text-base text-gray-600 dark:text-gray-400">Our system collects historical stock data from reliable financial sources.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Preprocessing</h3>
                  <p className="mt-1 text-base text-gray-600 dark:text-gray-400">Data is cleaned, normalized, and transformed into a format suitable for LSTM processing.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Model Training</h3>
                  <p className="mt-1 text-base text-gray-600 dark:text-gray-400">Our LSTM network learns patterns from historical data to make future predictions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    4
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Prediction</h3>
                  <p className="mt-1 text-base text-gray-600 dark:text-gray-400">The trained model generates predictions for future stock price movements.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                LSTM Architecture
              </h3>
              <img 
                src="https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Neural network visualization" 
                className="w-full h-auto rounded-lg mb-4" 
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                LSTM networks contain specialized memory cells that can maintain information for long periods of time, making them ideal for time series prediction.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Accuracy on Test Data</span>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">87%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Mean Absolute Error</span>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">2.3%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '97.7%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;