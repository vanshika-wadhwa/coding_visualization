// Array to store tasks
const tasks = [];

// Add task
function addTask() {
    const name = document.getElementById("taskName").value;
    const burstTime = parseInt(document.getElementById("burstTime").value);

    if (name && burstTime > 0) {
        tasks.push({ name, burstTime });
        document.getElementById("taskName").value = '';
        document.getElementById("burstTime").value = '';
        alert(`Added Task: ${name}, Burst Time: ${burstTime}`);
    } else {
        alert("Please enter valid task details.");
    }
}

// Execute selected algorithm
function executeAlgorithm() {
    const algorithm = document.getElementById("algorithm").value;
    let scheduledTasks;

    if (algorithm === "fcfs") {
        scheduledTasks = fcfs(tasks);
    } else if (algorithm === "sjf") {
        scheduledTasks = sjf(tasks);
    } else if (algorithm === "roundRobin") {
        const timeQuantum = 2; // You can make this an input later
        scheduledTasks = roundRobin(tasks, timeQuantum);
    }

    visualize(scheduledTasks);
}

// First-Come, First-Served (FCFS)
function fcfs(taskList) {
    return taskList.map((task, index) => ({
        ...task,
        startTime: index === 0 ? 0 : taskList.slice(0, index).reduce((acc, t) => acc + t.burstTime, 0)
    }));
}

// Shortest Job First (SJF)
function sjf(taskList) {
    const sortedTasks = [...taskList].sort((a, b) => a.burstTime - b.burstTime);
    return fcfs(sortedTasks);
}

// Round Robin
function roundRobin(taskList, quantum) {
    let time = 0;
    let queue = [...taskList];
    const schedule = [];

    while (queue.length > 0) {
        const currentTask = queue.shift();
        const executionTime = Math.min(currentTask.burstTime, quantum);
        schedule.push({ name: currentTask.name, startTime: time, burstTime: executionTime });

        time += executionTime;
        if (currentTask.burstTime > quantum) {
            queue.push({ name: currentTask.name, burstTime: currentTask.burstTime - quantum });
        }
    }

    return schedule;
}

// Visualization Function
function visualize(scheduledTasks) {
    const container = document.getElementById("visualization");
    container.innerHTML = ''; // Clear previous visualization

    scheduledTasks.forEach(task => {
        // Create task element
        const taskDiv = document.createElement("div");
        taskDiv.className = "bg-blue-500 text-white p-2 m-1 rounded text-center";
        taskDiv.style.width = `${task.burstTime * 30}px`; // Adjust width based on burst time
        taskDiv.innerText = `${task.name} (${task.startTime} - ${task.startTime + task.burstTime})`;

        // Append task to the container
        container.appendChild(taskDiv);
    });
}
