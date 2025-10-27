import React from 'react';

const NotesTab = ({ notes, onNotesChange, isDarkMode }) => {
  const cardClass = isDarkMode ? 'bg-card-dark text-white' : 'bg-card-light text-dark';
  const inputClass = isDarkMode 
    ? 'bg-gray-700 text-white border-gray-600' 
    : 'bg-white border-secondary';

  return (
    <div className={`${cardClass} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
      <h2 className="text-2xl font-bold mb-6">Catatan Pribadi</h2>
      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Tulis catatan di sini..."
        className={`w-full p-4 border-2 rounded-lg ${inputClass} min-h-[400px] font-mono`}
      />
      <p className="text-sm opacity-50 mt-2">Data tersimpan otomatis saat Anda mengetik</p>
    </div>
  );
};

export default NotesTab;
