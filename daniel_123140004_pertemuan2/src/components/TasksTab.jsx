import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TasksTab = ({ tasks, onAddTask, onUpdateTask, onDeleteTask, onToggleTask, isDarkMode }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleSubmit = (formData) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, formData);
    } else {
      onAddTask(formData);
    }
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const cardClass = isDarkMode ? 'bg-card-dark text-white' : 'bg-card-light text-dark';

  return (
    <div className={`${cardClass} rounded-xl shadow-lg p-6 transition-colors duration-300`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Daftar Tugas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          <Plus size={20} /> Tambah Tugas
        </button>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingTask}
          isDarkMode={isDarkMode}
        />
      )}

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-center py-8 opacity-50">Belum ada tugas</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={onDeleteTask}
              onToggle={onToggleTask}
              isDarkMode={isDarkMode}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TasksTab;
