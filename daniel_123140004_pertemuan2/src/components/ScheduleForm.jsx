import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const ScheduleForm = ({ onSubmit, onCancel, initialData, isDarkMode }) => {
  const [formData, setFormData] = useState({
    day: 'Senin',
    subject: '',
    time: '',
    room: '',
    lecturer: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.subject.trim()) return;
    onSubmit(formData);
  };

  const inputClass = isDarkMode 
    ? 'bg-gray-700 text-white border-gray-600' 
    : 'bg-white border-secondary';

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  return (
    <div className="mb-6 p-4 border-2 border-purple-400 rounded-lg">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <select
          value={formData.day}
          onChange={(e) => setFormData({...formData, day: e.target.value})}
          className={`p-3 border rounded-lg ${inputClass}`}
        >
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Mata Kuliah"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          className={`p-3 border rounded-lg ${inputClass}`}
        />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <input
          type="text"
          placeholder="Waktu (08:00-10:00)"
          value={formData.time}
          onChange={(e) => setFormData({...formData, time: e.target.value})}
          className={`p-3 border rounded-lg ${inputClass}`}
        />
        <input
          type="text"
          placeholder="Ruangan"
          value={formData.room}
          onChange={(e) => setFormData({...formData, room: e.target.value})}
          className={`p-3 border rounded-lg ${inputClass}`}
        />
        <input
          type="text"
          placeholder="Dosen"
          value={formData.lecturer}
          onChange={(e) => setFormData({...formData, lecturer: e.target.value})}
          className={`p-3 border rounded-lg ${inputClass}`}
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
        >
          <Save size={18} /> {initialData ? 'Update' : 'Simpan'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-secondary text-dark px-4 py-2 rounded-lg hover:bg-secondary-dark transition flex items-center justify-center gap-2"
        >
          <X size={18} /> Batal
        </button>
      </div>
    </div>
  );
};

export default ScheduleForm;
