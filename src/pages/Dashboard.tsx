import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StockCard from '../components/StockCard';
import StockChart from '../components/StockChart';
import { stocks, predictStockPrice } from '../services/gradioApi';
import { ArrowRight, Loader } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<{ text: string; chartData: any } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleStockSelect = (stockId: string) => {
    setSelectedStock(stockId);
    setPrediction(null);
    setError(null);
  };

  const handlePredict = async () => {
    if (!selectedStock) return;
    
    setLoading(true);
    setPrediction(null);
    setError(null);
    
    try {
      const result = await predictStockPrice(selectedStock);
      setPrediction({
        text: result.data[0],
        chartData: JSON.parse(result.data[1])
      });
    } catch (error) {
      console.error('Prediction error:', error);
      setError('Failed to get prediction. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Stock Price Prediction Dashboard
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Select a stock to get predictions based on our LSTM model.
            </p>
          </div>

          {/* Gradio Interface */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interactive Model Interface</h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://1ad179a152385e3887.gradio.live"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select a Stock</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {stocks.map((stock) => (
                <StockCard
                  key={stock.id}
                  id={stock.id}
                  name={stock.name}
                  emoji={stock.emoji}
                  color={stock.color}
                  onSelect={handleStockSelect}
                  isSelected={selectedStock === stock.id}
                />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={handlePredict}
                disabled={!selectedStock || loading}
                className={`px-8 py-3 rounded-lg text-lg font-medium flex items-center justify-center mx-auto ${
                  !selectedStock || loading
                    ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500 dark:text-gray-400'
                    : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg transition-all duration-200'
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin mr-2" size={20} />
                    Generating Prediction...
                  </>
                ) : (
                  <>
                    Predict {selectedStock ? stocks.find(s => s.id === selectedStock)?.name : ''} Price
                    <ArrowRight className="ml-2" size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-6 shadow border border-red-200 dark:border-red-800">
              <h3 className="text-lg font-medium text-red-800 dark:text-red-300">Error</h3>
              <p className="mt-2 text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}
          
          {prediction && (
            <div className="animate-fade-in bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Prediction Result for {stocks.find(s => s.id === selectedStock)?.name} ({selectedStock})
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Forecast</h3>
                <p className="text-xl text-primary-700 dark:text-primary-400 font-medium">{prediction.text}</p>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 p-4">
                <StockChart
                  historical={prediction.chartData.historical}
                  prediction={prediction.chartData.prediction}
                />
              </div>
              
              <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Disclaimer</h3>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                  Stock price predictions are based on historical data and machine learning models. They should not be used as the sole basis for investment decisions. Always conduct your own research before investing.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;