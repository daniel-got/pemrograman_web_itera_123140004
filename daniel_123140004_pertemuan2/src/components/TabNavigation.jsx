import React from 'react';

const TabNavigation = ({ activeTab, onTabChange, isDarkMode }) => {
  const cardClass = isDarkMode ? 'bg-card-dark text-white' : 'bg-card-light text-dark';
  
  const tabs = [
    { id: 'tasks', label: 'Daftar Tugas' },
    { id: 'schedule', label: 'Jadwal Kuliah' },
    { id: 'notes', label: 'Catatan' }
  ];
  
  return (
    <div className={`${cardClass} rounded-xl shadow-lg mb-6 transition-colors duration-300`}>
      <div className="flex border-b border-secondary">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-4 px-6 font-semibold transition ${
              activeTab === tab.id
                ? 'border-b-4 border-primary text-primary'
                : 'opacity-50 hover:opacity-75'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
