import React from 'react';
import { Edit2, Trash2, Clock } from 'lucide-react';

const ScheduleItem = ({ schedule, onEdit, onDelete, isDarkMode }) => {
  return (
    <div
      className={`p-4 border-2 rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-secondary'}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
              {schedule.day}
            </span>
            <h3 className="text-xl font-semibold">{schedule.subject}</h3>
          </div>
          <div className="ml-2 space-y-1">
            <p className="opacity-75">
              <Clock size={16} className="inline mr-2" />
              {schedule.time}
            </p>
            <p className="opacity-75">📍 {schedule.room}</p>
            <p className="opacity-75">👨‍🏫 {schedule.lecturer}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(schedule)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(schedule.id)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
