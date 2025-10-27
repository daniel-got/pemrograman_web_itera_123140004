import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const TaskForm = ({ onSubmit, onCancel, initialData, isDarkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    onSubmit(formData);
  };

  const inputClass = isDarkMode 
    ? 'bg-gray-700 text-white border-gray-600' 
    : 'bg-white border-secondary';

  return (
    <div className="mb-6 p-4 border-2 border-primary rounded-lg">
      <input
        type="text"
        placeholder="Judul Tugas"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        className={`w-full p-3 border rounded-lg mb-3 ${inputClass}`}
      />
      <textarea
        placeholder="Deskripsi"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        className={`w-full p-3 border rounded-lg mb-3 ${inputClass}`}
        rows="3"
      />
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
          className={`p-3 border rounded-lg ${inputClass}`}
        />
        <select
          value={formData.priority}
          onChange={(e) => setFormData({...formData, priority: e.target.value})}
          className={`p-3 border rounded-lg ${inputClass}`}
        >
          <option value="low">Prioritas Rendah</option>
          <option value="medium">Prioritas Sedang</option>
          <option value="high">Prioritas Tinggi</option>
        </select>
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

export default TaskForm;
