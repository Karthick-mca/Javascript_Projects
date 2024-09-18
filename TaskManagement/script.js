// Select Elements
const taskInput = document.getElementById('task-title');
const taskPriority = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load Tasks from Local Storage
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Add Task Button Event Listener
addTaskBtn.addEventListener('click', addTask);

// Filter Tasks Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => filterTasks(btn.dataset.filter));
});

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    const priority = taskPriority.value;
    if (taskText === "") return;

    const task = {
        id: Date.now(),
        text: taskText,
        priority,
        completed: false
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);

    taskInput.value = "";  // Clear input field
}

// Create task DOM element
function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.classList.toggle('completed', task.completed);

    li.innerHTML = `
        <span>${task.text} (${task.priority})</span>
        <button class="delete-btn">Delete</button>
    `;

    // Toggle completed task
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        toggleTaskCompletionInLocalStorage(task.id);
    });

    // Delete task
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        li.remove();
        removeTaskFromLocalStorage(task.id);
    });

    taskList.appendChild(li);
}

// Save Task to Local Storage
function saveTaskToLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Toggle Task Completion in Local Storage
function toggleTaskCompletionInLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Filter Tasks (All, Completed, Pending)
function filterTasks(filter) {
    const allTasks = document.querySelectorAll('li');
    allTasks.forEach(task => {
        if (filter === 'all') {
            task.style.display = 'flex';
        } else if (filter === 'completed') {
            task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
        } else if (filter === 'pending') {
            task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
        }
    });
}
