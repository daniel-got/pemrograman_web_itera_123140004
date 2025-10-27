import React from 'react';
import { CheckSquare, Calendar } from 'lucide-react';

const StatsCards = ({ tasks, schedules, isDarkMode }) => {
  const cardClass = isDarkMode ? 'bg-card-dark text-white' : 'bg-card-light text-dark';
  
  const completedTasks = tasks.filter(t => t.completed).length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className={`${cardClass} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-75 mb-1">Total Tugas</p>
            <p className="text-3xl font-bold">{tasks.length}</p>
          </div>
          <CheckSquare className="text-primary" size={40} />
        </div>
      </div>
      
      <div className={`${cardClass} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-75 mb-1">Tugas Selesai</p>
            <p className="text-3xl font-bold">{completedTasks}</p>
          </div>
          <CheckSquare className="text-green-500" size={40} />
        </div>
      </div>
      
      <div className={`${cardClass} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-75 mb-1">Jadwal Kuliah</p>
            <p className="text-3xl font-bold">{schedules.length}</p>
          </div>
          <Calendar className="text-purple-500" size={40} />
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
