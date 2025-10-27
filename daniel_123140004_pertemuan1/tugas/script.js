let tasks = [];

let editingTaskId = null;
//localStorage funct 
function saveTasks() {
    try {
        // Simpan array tasks ke localStorage dalam bentuk string JSON
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('Berhasil menyimpan tasks:', tasks);
    } catch (error) {
        console.error('Error saat menyimpan:', error);
        alert('Terjadi kesalahan saat menyimpan data');
    }
}
//get item from storage/local
function loadTasks() {
    try {
        const tasksString = localStorage.getItem('tasks');
        
        if (tasksString) {
            tasks = JSON.parse(tasksString);
            console.log('Berhasil memuat tasks:', tasks);
        } else {
            tasks = [];
            console.log('Tidak ada data tersimpan, memulai dengan array kosong');
        }
    } catch (error) {
        console.error('Error saat memuat data:', error);
        tasks = [];
        alert('Terjadi kesalahan saat memuat data');
    }
}

//validasi input tugas 
function validateTaskForm(name, course, deadline) {
    let isValid = true;

    document.getElementById('taskNameError').classList.remove('show');
    document.getElementById('taskCourseError').classList.remove('show');
    document.getElementById('taskDeadlineError').classList.remove('show');
    document.getElementById('taskName').classList.remove('error');
    document.getElementById('taskCourse').classList.remove('error');
    document.getElementById('taskDeadline').classList.remove('error');
//nama tugas 
    if (!name || name.trim() === '') {
        document.getElementById('taskNameError').classList.add('show');
        document.getElementById('taskName').classList.add('error');
        isValid = false;
    }
//nama matktul 
    if (!course || course.trim() === '') {
        document.getElementById('taskCourseError').classList.add('show');
        document.getElementById('taskCourse').classList.add('error');
        isValid = false;
    }
//deadline 
    if (!deadline) {
        document.getElementById('taskDeadlineError').classList.add('show');
        document.getElementById('taskDeadline').classList.add('error');
        isValid = false;
    } else {
        const selectedDate = new Date(deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set ke awal hari

        if (selectedDate < today) {
            document.getElementById('taskDeadlineError').textContent = 'Deadline tidak boleh tanggal masa lalu';
            document.getElementById('taskDeadlineError').classList.add('show');
            document.getElementById('taskDeadline').classList.add('error');
            isValid = false;
        }
    }

    return isValid;
}

//validasi edit 
function validateEditForm(name, course, deadline) {
    let isValid = true;

    // Reset error messages
    document.getElementById('editTaskNameError').classList.remove('show');
    document.getElementById('editTaskCourseError').classList.remove('show');
    document.getElementById('editTaskDeadlineError').classList.remove('show');
    document.getElementById('editTaskName').classList.remove('error');
    document.getElementById('editTaskCourse').classList.remove('error');
    document.getElementById('editTaskDeadline').classList.remove('error');

    if (!name || name.trim() === '') {
        document.getElementById('editTaskNameError').classList.add('show');
        document.getElementById('editTaskName').classList.add('error');
        isValid = false;
    }

    if (!course || course.trim() === '') {
        document.getElementById('editTaskCourseError').classList.add('show');
        document.getElementById('editTaskCourse').classList.add('error');
        isValid = false;
    }

    if (!deadline) {
        document.getElementById('editTaskDeadlineError').classList.add('show');
        document.getElementById('editTaskDeadline').classList.add('error');
        isValid = false;
    }

    return isValid;
}

//crud 
function addTask(name, course, deadline) {
    const newTask = {
        id: Date.now(), //id tugas 
        name: name.trim(),
        course: course.trim(),
        deadline: deadline,
        completed: false,
        createdAt: new Date().toISOString()
    };

    // Tambahkan ke array tasks
    tasks.push(newTask);
    
    // Simpan ke localStorage
    saveTasks();
    
    // Refresh tampilan
    renderTasks();
    
    // Update statistik
    updateStatistics();
    
    console.log('Tugas baru ditambahkan:', newTask);
}


//Updae status selesai/belum selesai

function toggleTaskStatus(id) {
    // Cari tugas berdasarkan ID
    const task = tasks.find(t => t.id === id);
    
    if (task) {
        // Toggle status completed
        task.completed = !task.completed;
        
        // Simpan perubahan
        saveTasks();
        
        // Refresh tampilan
        renderTasks();
        
        // Update statistik
        updateStatistics();
        
        console.log('Status tugas diubah:', task);
    }
}

//edit tugas 
function updateTask(id, name, course, deadline) {
    // Cari tugas berdasarkan ID
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex !== -1) {
        // Update data tugas
        tasks[taskIndex].name = name.trim();
        tasks[taskIndex].course = course.trim();
        tasks[taskIndex].deadline = deadline;
        
        // Simpan perubahan
        saveTasks();
        
        // Refresh tampilan
        renderTasks();
        
        // Update statistik
        updateStatistics();
        
        console.log('Tugas berhasil diupdate:', tasks[taskIndex]);
    }
}

//hapus tugas 
function deleteTask(id) {
    // Konfirmasi sebelum menghapus
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        // Filter array, buang tugas dengan ID yang sama
        tasks = tasks.filter(t => t.id !== id);
        
        // Simpan perubahan
        saveTasks();
        
        // Refresh tampilan
        renderTasks();
        
        // Update statistik
        updateStatistics();
        
        console.log('Tugas berhasil dihapus');
    }
}

//dislay tugas 
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    const searchQuery = document.getElementById('searchTask').value.toLowerCase();
    const filterStatus = document.getElementById('filterStatus').value;

    // Filter tugas berdasarkan pencarian dan status
    let filteredTasks = tasks.filter(task => {
        // Filter berdasarkan pencarian
        const matchSearch = task.name.toLowerCase().includes(searchQuery) || 
                          task.course.toLowerCase().includes(searchQuery);
        
        // Filter berdasarkan status
        let matchStatus = true;
        if (filterStatus === 'pending') {
            matchStatus = !task.completed;
        } else if (filterStatus === 'completed') {
            matchStatus = task.completed;
        }
        
        return matchSearch && matchStatus;
    });

    // Jika tidak ada tugas
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <h3>Tidak ada tugas</h3>
                <p>Mulai tambahkan tugas baru untuk mengelola aktivitas akademikmu!</p>
            </div>
        `;
        return;
    }

    // Buat HTML untuk setiap tugas
    let tasksHTML = '';
    filteredTasks.forEach(task => {
        const deadlineDate = new Date(task.deadline);
        const today = new Date();
        const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        
        let deadlineClass = '';
        let deadlineText = formatDate(task.deadline);
        
        if (daysLeft < 0) {
            deadlineClass = 'deadline-urgent';
            deadlineText += ' (Terlambat!)';
        } else if (daysLeft === 0) {
            deadlineClass = 'deadline-urgent';
            deadlineText += ' (Hari ini!)';
        } else if (daysLeft <= 3) {
            deadlineClass = 'deadline-urgent';
            deadlineText += ` (${daysLeft} hari lagi)`;
        } else {
            deadlineText += ` (${daysLeft} hari lagi)`;
        }

        tasksHTML += `
            <div class="task-item ${task.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    onchange="toggleTaskStatus(${task.id})"
                >
                <div class="task-content">
                    <div class="task-header">
                        <div>
                            <div class="task-name">${task.name}</div>
                            <span class="task-course">${task.course}</span>
                        </div>
                        <div class="task-actions">
                            <button class="btn-icon btn-edit" onclick="openEditModal(${task.id})">
                                Edit
                            </button>
                            <button class="btn-icon btn-delete" onclick="deleteTask(${task.id})">
                                Hapus
                            </button>
                        </div>
                    </div>
                    <div class="task-deadline ${deadlineClass}">
                        Deadline: ${deadlineText}
                    </div>
                </div>
            </div>
        `;
    });

    tasksList.innerHTML = tasksHTML;
}

//update statistik 
function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

//format tanggal 
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
}

//editModal
function openEditModal(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        editingTaskId = id;
        document.getElementById('editTaskName').value = task.name;
        document.getElementById('editTaskCourse').value = task.course;
        document.getElementById('editTaskDeadline').value = task.deadline;
        document.getElementById('editModal').classList.add('show');
    }
}

function closeEditModal() {
    editingTaskId = null;
    document.getElementById('editModal').classList.remove('show');
    document.getElementById('editForm').reset();
}

// Event listener untuk form tambah tugas
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Mencegah form reload halaman
    
    // Ambil nilai dari input
    const name = document.getElementById('taskName').value;
    const course = document.getElementById('taskCourse').value;
    const deadline = document.getElementById('taskDeadline').value;
    
    // Validasi input
    if (validateTaskForm(name, course, deadline)) {
        // Jika valid, tambahkan tugas
        addTask(name, course, deadline);
        
        // Reset form
        this.reset();
        
        // Tampilkan notifikasi sukses
        alert('Tugas berhasil ditambahkan!');
    }
});

// Event listener untuk form edit tugas
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('editTaskName').value;
    const course = document.getElementById('editTaskCourse').value;
    const deadline = document.getElementById('editTaskDeadline').value;
    
    if (validateEditForm(name, course, deadline)) {
        updateTask(editingTaskId, name, course, deadline);
        closeEditModal();
        alert('Tugas berhasil diupdate!');
    }
});

// Event listener untuk pencarian (real-time search)
document.getElementById('searchTask').addEventListener('input', function() {
    renderTasks();
});

// Event listener untuk filter status
document.getElementById('filterStatus').addEventListener('change', function() {
    renderTasks();
});

// Event listener untuk menutup modal ketika klik di luar modal
document.getElementById('editModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeEditModal();
    }
});

//mulai web, ambil data dari local, 
function initApp() {
    console.log('Starting apps goes brr ;)');
    
    // Muat data dari localStorage (INI YANG TADI KURANG!)
    loadTasks();
    
    // Tampilkan data ke UI
    renderTasks();
    
    // Update statistik
    updateStatistics();
    
    // Set minimum date untuk input deadline (hari ini)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDeadline').setAttribute('min', today);
    document.getElementById('editTaskDeadline').setAttribute('min', today);
    
    console.log('Aplikasi siap digunakan!');
    console.log('Total tugas dimuat:', tasks.length);
}

window.addEventListener('DOMContentLoaded', initApp);
