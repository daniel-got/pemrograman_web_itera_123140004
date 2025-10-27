import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ScheduleForm from './ScheduleForm';
import ScheduleItem from './ScheduleItem';

const ScheduleTab = ({ schedules, onAddSchedule, onUpdateSchedule, onDeleteSchedule, isDarkMode }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const handleSubmit = (formData) => {
    if (editingSchedule) {
      onUpdateSchedule(editingSchedule.id, formData);
    } else {
      onAddSchedule(formData);
    }
    setShowForm(false);
    setEditingSchedule(null);
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSchedule(null);
  };

  const cardClass = isDarkMode ? 'bg-card-dark text-white' : 'bg-card-light text-dark';

  return (
    <div className={`${cardClass} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Jadwal Kuliah</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
        >
          <Plus size={20} /> Tambah Jadwal
        </button>
      </div>

      {showForm && (
        <ScheduleForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingSchedule}
          isDarkMode={isDarkMode}
        />
      )}

      <div className="space-y-3">
        {schedules.length === 0 ? (
          <p className="text-center py-8 opacity-50">Belum ada jadwal</p>
        ) : (
          schedules.map(schedule => (
            <ScheduleItem
              key={schedule.id}
              schedule={schedule}
              onEdit={handleEdit}
              onDelete={onDeleteSchedule}
              isDarkMode={isDarkMode}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ScheduleTab;
