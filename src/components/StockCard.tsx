import React from 'react';

interface StockCardProps {
  id: string;
  name: string;
  emoji: string;
  color: string;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

const StockCard: React.FC<StockCardProps> = ({ id, name, emoji, color, onSelect, isSelected }) => {
  return (
    <button
      onClick={() => onSelect(id)}
      className={`relative w-full h-32 rounded-xl shadow-md transition-all duration-300 overflow-hidden ${
        isSelected 
          ? 'ring-4 ring-primary-500 scale-105' 
          : 'hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      <div className={`absolute inset-0 ${color} opacity-20`}></div>
      <div className="absolute inset-0 bg-white dark:bg-gray-800 opacity-80"></div>
      <div className="relative h-full flex flex-col items-center justify-center p-4">
        <span className="text-3xl mb-2">{emoji}</span>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{id}</p>
        {isSelected && (
          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary-500"></div>
        )}
      </div>
    </button>
  );
};

export default StockCard;