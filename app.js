// const input = document.getElementById("todoInput");
// const button = document.getElementById("addButton");
// const todoList = document.getElementById("todoList");



// button.addEventListener("click", function(){
   
//     const task = input.value

//     const existingTasks = todoList.querySelectorAll("li")
//     // console.log("list of tasks", existingTasks)

//     for (let i = 0; i < existingTasks.length; i++) {

//         if (existingTasks[i].firstChild.textContent.trim() === task.trim()) {
//             alert("This Already Exists in Your Tasks!");
//             return;
//         }
//     }

//     // Create a new DOM element
//     const newTask = document.createElement("li")

//     // Add input text in the newly created li
//     newTask.textContent = task

//     // Add the Delete button
//     const deleteButton = document.createElement("button")

//     // Add Delete button text
//     deleteButton.textContent = "Delete"

//     // Add Delete functionality to button
//     deleteButton.addEventListener("click", function(){
//         newTask.remove();
//     })

//     // Add the Delete button to the li
//     newTask.appendChild(deleteButton)

//     // Add the newly created li to the existing ul
//     todoList.appendChild(newTask)

//     // Reset the input
//     input.value = ""

// });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

