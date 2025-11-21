# 📱 Personal Dashboard Application

Aplikasi Personal Dashboard sederhana untuk mengelola tugas kuliah, jadwal, dan catatan pribadi.

## 🎨 Color Palette
- **Primary**: #313851 (Dark Blue)
- **Secondary**: #C2CBD3 (Light Blue Gray)  
- **Background**: #F6F3ED (Cream/Beige)

## ✨ Fitur Utama

### 1. Manajemen Tugas
- ✅ Tambah, edit, dan hapus tugas
- ✅ Tandai tugas selesai
- ✅ Set prioritas (Tinggi, Sedang, Rendah)
- ✅ Atur deadline

### 2. Jadwal Kuliah
- 📅 Manajemen jadwal per hari
- 📅 Info: Mata Kuliah, Waktu, Ruangan, Dosen

### 3. Catatan Pribadi
- 📝 Area menulis catatan bebas
- 📝 Auto-save

### 4. Fitur Lainnya
- 🕐 Jam real-time
- 📊 Dashboard statistik
- 🌓 Dark/Light mode
- 📱 Responsive design

## 🎯 Implementasi ES6+ Features

### ✅ 1. let dan const
Digunakan secara konsisten di seluruh aplikasi untuk deklarasi variabel.

### ✅ 2. Arrow Functions (15+ implementasi)
- `formatTime = (date) => {...}`
- `formatDate = (date) => {...}`
- `getPriorityColor = (priority) => {...}`
- `handleAddTask = (taskData) => {...}`
- Dan banyak lagi...

### ✅ 3. Template Literals
```javascript
return `${hours}:${minutes}:${seconds}`;
return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
```

### ✅ 4. Classes (2 Classes)
- **Task Class**: Mengelola data dan operasi tugas
- **Schedule Class**: Mengelola data jadwal

### ✅ 5. Async/Await Pattern
Menggunakan useEffect dan Promise-based state management.

### ✅ 6. Destructuring
```javascript
const { tasks, schedules, isDarkMode } = props;
```

### ✅ 7. Spread Operator
```javascript
setTasks(prev => [...prev, newTask]);
setFormData({...formData, title: value});
```

### ✅ 8. Array Methods (map, filter)
```javascript
tasks.filter(t => t.completed)
tasks.map(task => <TaskItem key={task.id} />)
```

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js (v14 atau lebih baru)
- npm atau yarn

### Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd personal-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

4. Jalankan aplikasi
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## 📂 Struktur Project
personal-dashboard/
├── src/
│   ├── components/        
│   ├── models/           
│   ├── utils/            
│   ├── styles/           
│   ├── App.jsx           
│   └── index.js         
├── public/
├── package.json
├── tailwind.config.js
└── README.md

## Screenshots

### Light Mode
<img width="1293" height="595" alt="image" src="https://github.com/user-attachments/assets/29043a0c-b05a-4c8e-b01d-b91ab29e457a" />


### Dark Mode
<img width="1304" height="596" alt="image" src="https://github.com/user-attachments/assets/ee3a9869-1547-40eb-83ed-8f76cbdc1e41" />


### Manajemen Tugas
<img width="1274" height="484" alt="image" src="https://github.com/user-attachments/assets/a73ba8c5-9117-4549-bd81-df238661e98c" />


### Jadwal Kuliah  
<img width="1242" height="524" alt="image" src="https://github.com/user-attachments/assets/9e41e5bf-7bac-4dc0-8c95-ed31cba9cadf" />


## 🔧 Teknologi yang Digunakan

- **React 18**: Library UI
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **ES6+**: Modern JavaScript features

## 👨‍💻 Developer

Daniel Calvin Simanjuntak
123140004 
RA 

## 📄 License

MIT License - Gunakan sesuka hati untuk keperluan pendidikan.
