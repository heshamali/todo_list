/*------------------------- To Do List Two ------------------------- */ 
// Get The Elements 
let form = document.querySelector(".main");
let input = document.querySelector(".input");
let tasksDiv = document.querySelector(".tasks");

// Create Array Of Tasks
let tasks = [];

// Get Data From Local Storage After Reloading Page
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}

// getData Function Execution
getData();

// Submit Button And Prevent Default
form.onsubmit = function (e) {
    let inputValid = false;

    if (input.value !== "") {
        addTasks(input.value); // add Tasks Function
        input.value = "";
    }

    if (inputValid === false) {
        e.preventDefault();
    }
}

// Delete And Update Tasks
tasksDiv.addEventListener("click", function (t) {
    // The Delete Button
    if (t.target.classList.contains("del")) {
        this.style.color = "#e13b89";
        // Delete Task From Local Storage
        deleteStorage(t.target.parentElement.getAttribute("data-id"));

        //Delete The Div Of Task
        t.target.parentElement.remove();

    }

    // Update Statu Of Tasks
    if (t.target.classList.contains("task")) {
        statu(t.target.getAttribute("data-id"));
        t.target.classList.toggle("done");

        // let h = t.target.querySelector("i");
        // if (h.classList.contains("fa-square-pen")) {
        //     h.classList.remove("fa-square-pen");
        //     h.classList.add("fa-square-check");
        // } else {
            
        //     h.classList.add("fa-square-pen")
        // }


        let c = t.target.querySelector("i");
        if (c.classList.contains("fa-square-pen")) {
            c.classList.remove("fa-square-pen");
            c.classList.add("fa-square-check");
            c.style.color = "#F0E764";
        } else {
            c.classList.remove("fa-square-check");
            c.classList.add("fa-square-pen");
            c.style.color = "#4C89E8";
        }
    }
});

// Create addTasks Function
function addTasks(taskText) {
    // Get Tasks Data
    const task = {
        id: Date.now(),
        title: taskText,
        statu: false,
    }

    // Push Task To Tasks Array
    tasks.push(task);

    // Add Tasks To Page Function
    tasksPage(tasks);

    // Store Tasks In Local Storage Function
    storeData(tasks);
}

// Create tasksPage Function
function tasksPage(tasks) {
    // Empty The Tasks Div
    tasksDiv.innerHTML = "";

    // Looping Tasks In Tasks Array
    tasks.forEach((task) => {
        let div = document.createElement("div");

        // Check Icon
        let check = document.createElement("i");
        check.className = "fa-solid fa-square-pen";
        div.appendChild(check);

        div.className = "task";
        if (task.statu) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        // Create Delete Button
        let btn = document.createElement("i");
        btn.className = "del fa-solid fa-trash";
        btn.style.cursor = "pointer";

        div.appendChild(btn);

        tasksDiv.appendChild(div);

    });
}


// Create storeData Function
function storeData(tasks) {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create getData Function
function getData() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let task = JSON.parse(data);
        tasksPage(tasks);
    }
}

// Create deleteStorage Function
function deleteStorage(taskId) {
    tasks = tasks.filter((task) => task.id != taskId);
    storeData(tasks);
}

// Create Statu Function
function statu(taskId) {
    for ( let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            tasks[i].statu == false ? tasks[i].statu = true : tasks[i].statu = false;
        }
    }
    storeData(tasks);
}


