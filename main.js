let inputTask = document.querySelector("#newtask"),
    clearAll = document.querySelector(".clearBtn"),
    filters = document.querySelectorAll(".control span"),
    taskBox = document.querySelector(".taskBox");

let isEdit = false,
    editId,
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

inputTask.addEventListener("keypress", (e) => {
    let isTextValid = inputTask.value.trim();
    if (e.key == "Enter" && isTextValid) {
        if (!isEdit) {
            tasks.push({
                text: inputTask.value,
                status: "pending",
            });
            inputTask.value = "";
        } else {
            isEdit = false;
            tasks[editId].text = isTextValid;
            inputTask.value = "";
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTask(document.querySelector("span.active").id);
});

filters.forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTask(btn.id);
    });
});

let showTask = (tab) => {
    let liTag = "";
    tasks.forEach((task, index) => {
        let completed = task.status == "completed" ? "checked" : "";
        if (tab == "all" || tab == task.status)
            liTag += `
            <li id = ${index} class="task">
                <p id = ${index} class="inputTest ${completed}" onClick="updateStatus(this)">${task.text}</p>
                <div class="taskControl">
                    <i onClick="editTask(${index} ,'${task.text}')" class="fa-solid fa-pen-to-square editTask"></i>
                    <i onClick="deleteTask(${index} ,'${tab}')" class="fa-solid fa-trash deleteTash"></i>
                </div>
            </li>
        `;
    });

    taskBox.innerHTML =
        liTag || `<p>You don't have any task at ${tab} tab.</p>`;
};

let editTask = (id, text) => {
    editId = id;
    isEdit = true;
    inputTask.value = text;
    inputTask.focus();
};

let deleteTask = (id, filter) => {
    isEdit = false;
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTask(filter);
};

let clearAllTask = (e) => {
    isEdit = false;
    tasks.splice(0, tasks.length);
    showTask();
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

let updateStatus = (task) => {
    if (task.classList.contains("checked")) {
        task.classList.remove("checked");
        tasks[task.id].status = "pending";
    } else {
        task.classList.add("checked");
        tasks[task.id].status = "completed";
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

(() => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    showTask();
})();

showTask("all");
