import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import TabNavigation from './components/TabNavigation';
import TasksTab from './components/TasksTab';
import ScheduleTab from './components/ScheduleTab';
import NotesTab from './components/NotesTab';
import { Task, Schedule } from './models';
import './styles/tailwind-config.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [notes, setNotes] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    loadInitialData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Di src/App.jsx, tambahkan:

// Load data dari localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const savedSchedules = JSON.parse(localStorage.getItem('schedules') || '[]');
    const savedNotes = localStorage.getItem('notes') || '';
    
    if (savedTasks.length > 0) setTasks(savedTasks);
    if (savedSchedules.length > 0) setSchedules(savedSchedules);
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Save data ke localStorage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('schedules', JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    localStorage.setItem('notes', notes);
  }, [notes]);

  const loadInitialData = () => {
    const initialTasks = [
      new Task(1, 'Tugas Pemrograman Web', 'Buat aplikasi dashboard dengan React', '2025-11-01', 'high', false),
      new Task(2, 'Baca Materi Database', 'Chapter 5-7 tentang Normalisasi', '2025-10-30', 'medium', false)
    ];
    const initialSchedules = [
      new Schedule(1, 'Senin', 'Pemrograman Web', '08:00 - 10:00', 'Lab A', 'Dr. Ahmad'),
      new Schedule(2, 'Selasa', 'Basis Data', '10:00 - 12:00', 'Lab B', 'Prof. Sarah')
    ];
    const initialNotes = 'Catatan penting:\n- Jangan lupa meeting dengan dosen pembimbing\n- Persiapkan presentasi minggu depan';
    
    setTasks(initialTasks);
    setSchedules(initialSchedules);
    setNotes(initialNotes);
  };

  const handleAddTask = (taskData) => {
    const newTask = new Task(
      Date.now(),
      taskData.title,
      taskData.description,
      taskData.deadline,
      taskData.priority
    );
    setTasks(prev => [...prev, newTask]);
  };

  const handleUpdateTask = (id, taskData) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? task.updateTask(taskData) : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleToggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? task.toggleComplete() : task
      )
    );
  };

  const handleAddSchedule = (scheduleData) => {
    const newSchedule = new Schedule(
      Date.now(),
      scheduleData.day,
      scheduleData.subject,
      scheduleData.time,
      scheduleData.room,
      scheduleData.lecturer
    );
    setSchedules(prev => [...prev, newSchedule]);
  };

  const handleUpdateSchedule = (id, scheduleData) => {
    setSchedules(prev =>
      prev.map(schedule =>
        schedule.id === id ? schedule.update(scheduleData) : schedule
      )
    );
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(prev => prev.filter(s => s.id !== id));
  };

  const handleNotesChange = (value) => {
    setNotes(value);
  };



  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-dark' : 'bg-light'
    }`}>
      <div className="container mx-auto p-6 max-w-7xl">
        <Header 
          currentTime={currentTime}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        />

        <StatsCards 
          tasks={tasks}
          schedules={schedules}
          isDarkMode={isDarkMode}
        />

        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isDarkMode={isDarkMode}
        />

        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'tasks' && (
            <TasksTab
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onToggleTask={handleToggleTask}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'schedule' && (
            <ScheduleTab
              schedules={schedules}
              onAddSchedule={handleAddSchedule}
              onUpdateSchedule={handleUpdateSchedule}
              onDeleteSchedule={handleDeleteSchedule}
              isDarkMode={isDarkMode}
            />
          )}

          {activeTab === 'notes' && (
            <NotesTab
              notes={notes}
              onNotesChange={handleNotesChange}
              isDarkMode={isDarkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
