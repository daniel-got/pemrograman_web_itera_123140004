import React from 'react';
import { Edit2, Trash2, Clock } from 'lucide-react';
import { getPriorityColor } from '../utils/colorHelper';

const TaskItem = ({ task, onEdit, onDelete, onToggle, isDarkMode }) => {
  const priorityLabels = {
    high: 'Tinggi',
    medium: 'Sedang',
    low: 'Rendah'
  };

  return (
    <div
      className={`p-4 border-2 rounded-lg transition ${
        task.completed ? 'opacity-50 bg-gray-50' : ''
      } ${isDarkMode ? 'border-gray-700' : 'border-secondary'}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="w-5 h-5 cursor-pointer"
            />
            <h3 className={`text-xl font-semibold ${task.completed ? 'line-through' : ''}`}>
              {task.title}
            </h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(task.priority)}`}>
              {priorityLabels[task.priority]}
            </span>
          </div>
          <p className="ml-8 opacity-75 mb-2">{task.description}</p>
          <div className="ml-8 flex items-center gap-2 text-sm opacity-75">
            <Clock size={16} />
            <span>Deadline: {task.deadline || 'Tidak ada deadline'}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
