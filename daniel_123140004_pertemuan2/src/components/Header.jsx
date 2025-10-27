import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { formatTime, formatDate } from '../utils/dateFormatter';

const Header = ({ currentTime, isDarkMode, onToggleDarkMode }) => {
  const cardClass = isDarkMode ? 'bg-card-dark text-white' : 'bg-card-light text-dark';
  
  return (
    <div className={`${cardClass} rounded-2xl shadow-xl p-6 mb-6 transition-colors duration-300`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Personal Dashboard</h1>
          <p className="text-lg opacity-75">{formatDate(currentTime)}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold mb-2">{formatTime(currentTime)}</div>
          <button
            onClick={onToggleDarkMode}
            className="mt-2 p-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
