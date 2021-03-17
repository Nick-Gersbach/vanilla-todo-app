const form = document.querySelector('#task-form');
const taskList = document.querySelector('.ul-task-list');
const clearTasks = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//LOAD ALL EVENT LISTENERS
loadEventListeners();

//LOAD ALL EVENT LISTENERS
function loadEventListeners() {
    //DOM Load Event for local storage tasks to load
    document.addEventListener('DOMContentLoaded', showTasksFromLocalStorage);
    //Add Task Event
    form.addEventListener('submit', addTask);
    //Remove task (x) 
    taskList.addEventListener('click', deleteTask);
    //Clear All Tasks
    clearTasks.addEventListener('click', clearAllTasks);
    //Filter Tasks
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks From Local Storage and Show in UI
function showTasksFromLocalStorage () {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    //CREATE LI ELEMENT
    const li = document.createElement('li');
    //Add Class to li
    li.className = 'task-list-item';
    //Create Text Node and append(add too) the li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link = document.createElement('a');
    //Add x from font awesome
    link.className = 'delete-item';
    //Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append Link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    });
}

//Add Task
function addTask(e) {

    if(taskInput.value === '') {
        alert('Please Add a Task');
    }

    //CREATE LI ELEMENT
    const li = document.createElement('li');
    //Add Class to li
    li.className = 'task-list-item';
    //Create Text Node and append(add too) the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //Add x from font awesome
    link.className = 'delete-item';
    //Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append Link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);



    //Local Storage Function
    storeTaskInLocalStorage(taskInput.value);





    //clear task input after we add the task
    taskInput.value = '';



    e.preventDefault();
}

//This stores tasks into local storage but it won't show in the UI yet
function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//DELETE TASK (X)
function deleteTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Do you want to delete the task?')) {
            e.target.parentElement.parentElement.remove();

            //Remove Task From Local Storage
            removeTaskFromLocalStorage (e.target.parentElement.parentElement);
        }
    }
}

//Remove From Local Storage when we hit delete buttons
function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear All Tasks
function clearAllTasks () {
    taskList.innerHTML = '';

    //Clear all tasks from Local Storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks (e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.task-list-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}