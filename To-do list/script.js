// Select elements
const todoInput = document.getElementById('todo-input');
const addTaskBtn = document.getElementById('add-task-btn');
const todoList = document.getElementById('todo-list');

// Event listener for adding a new task
addTaskBtn.addEventListener('click', addTask);

// Load tasks from Local Storage on page load
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

// Function to add task
function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = createTaskElement(taskText);
    todoList.appendChild(task);

    // Save task to local storage
    saveTaskToLocalStorage(taskText);

    // Clear the input field
    todoInput.value = "";
}

// Function to create task list element
function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Add toggle complete functionality
    li.addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Add delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        removeTaskFromLocalStorage(taskText);
    });

    li.appendChild(deleteBtn);

    return li;
}

// Save task to Local Storage
function saveTaskToLocalStorage(taskText) {
    let tasks = localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];
    
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from Local Storage
function loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];

    tasks.forEach(taskText => {
        const task = createTaskElement(taskText);
        todoList.appendChild(task);
    });
}
