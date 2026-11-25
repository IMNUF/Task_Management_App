// ESTABLISHING THE DOM ELEMENTS
const input = document.getElementById("todoInput");
const categoryInput = document.getElementById("inputCategory");
const deadlineInput = document.getElementById("inputDeadline");
const statusInput = document.getElementById("inputStatus");
const button = document.getElementById("addButton");
const filterCategory = document.getElementById("categoryFilter");
const filterStatus = document.getElementById("statusFilter");
const todoList = document.getElementById("todoList");


// THE TASK ARRAY 
let tasks = loadTasks();

// LOCAL STORAGE
function saveTasks() {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.log("unable to save task", error)
    }
}

function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem("tasks"));
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

// OVERDUE TASK CHECK
function getToday() {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return now.getFullYear() + "-" + month + "-" + day;
}

// RECORDING TASK AS OVERDUE 
function checkOverdue() {
    const today = getToday();
    let changed = false;

    tasks.forEach(function(task) {
        if (task.deadline && task.deadline < today
            && task.status !== "Completed" && task.status !== "Overdue") {
            task.status = "Overdue";
            changed = true;
        }
    });

    if (changed) {
        saveTasks();
    }
}

// ADD TASK / DELETE AND UPDATE  
function addTask() {

// STORE THE INPUT 
    const name = input.value.trim();

    if (name === "") {
        alert("Please enter a task name.");
        return;
    }
// DUPLICATE ENTRY ALERT 
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].name.toLowerCase() === name.toLowerCase()) {
            alert("This Task exists!");
            return;
        }
    }

// CREATE TASK OBJECTS AND ADD TO ARRAY 
    const newTask = {
        id: Date.now(),
        name: name,
        category: categoryInput.value,
        deadline: deadlineInput.value,
        status: statusInput.value
    };
    tasks.push(newTask);

    checkOverdue();
    saveTasks();
    renderTasks();

// RESET THE FORM
    input.value = "";
    deadlineInput.value = "";
    statusInput.value = "In Progress";
    input.focus();
}

function updateStatus(id, newStatus) {
    const task = tasks.find(function(item) {
        return item.id === id;
    });

    if (task) {
        task.status = newStatus;
        checkOverdue();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(function(item) {
        return item.id !== id;
    });
    saveTasks();
    renderTasks();
}

// FILTER

function getFilteredTasks() {
    return tasks.filter(function(task) {
        const categoryMatch = filterCategory.value === "All" || task.category === filterCategory.value;
        const statusMatch = filterStatus.value === "All" || task.status === filterStatus.value;
        return categoryMatch && statusMatch;
    });
}

// DISPLAY

function renderTasks() {

// CLEAR LIST AND  REBUILD FROM ARRAY 
    todoList.innerHTML = "";

    const visibleTasks = getFilteredTasks();

    if (visibleTasks.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = tasks.length === 0
            ? "No tasks yet. Add one!"
            : "No tasks match this filter.";
        todoList.appendChild(empty);
        return;
    }

    visibleTasks.forEach(function(task) {
        
// CREATE A NEW DOM ELEMENT  
        const li = document.createElement("li");
        li.className = "task " + task.status.toLowerCase().replace(" ", "-");

// CREATE TASK NAME
        const name = document.createElement("span");
        name.className = "task-name";
        name.textContent = task.name;

//CATEGORY AND DEADLINE 
        const details = document.createElement("span");
        details.className = "task-details";
        details.textContent = task.category + " | Due: " + (task.deadline || "No deadline");

// ESTABLISHING STATUSES
        const StatusUpdate = ["In Progress", "Completed", "Overdue"];

//STATUS DROPDOWN 
        const select = document.createElement("select");
        select.setAttribute("aria-label", "Status for " + task.name);
        StatusUpdate.forEach(function(status) {
        
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;

        if (status === task.status) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.addEventListener("change", function() {
            updateStatus(task.id, select.value);
        });

//DELETE BUTTON         
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.className = "delete-btn";
        deleteButton.setAttribute("aria-label", "Delete " + task.name);
        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

//APPEND TO LIST AND ADD TO UNORDERED LIST  
        li.append(name, details, select, deleteButton);
        todoList.appendChild(li);
    });
}

//ADD EVENT LISTENERS  
button.addEventListener("click", addTask);
filterCategory.addEventListener("change", renderTasks);
filterStatus.addEventListener("change", renderTasks);

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

//TO ENSURE SAVED TASK AND OVERDUE MARKING WORKS 

checkOverdue();
renderTasks();
