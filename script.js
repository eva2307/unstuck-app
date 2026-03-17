let tasks = [];

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const deadline = document.getElementById("taskDeadline").value;
  const duration = document.getElementById("taskDuration").value;
  const priority = document.getElementById("taskPriority").value;
  const friction = document.getElementById("taskFriction").value;

  const task = { title, deadline, duration, priority, friction };
  tasks.push(task);

  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.title} | priority: ${t.priority} | friction: ${t.friction}`;
    list.appendChild(li);
  });
}

function suggestTask() {
  if (tasks.length === 0) return;

  // jednoduchá logika (zatím)
  let best = tasks[0];

  tasks.forEach(t => {
    if (t.priority > best.priority) {
      best = t;
    }
  });

  document.getElementById("suggestion").innerText =
    "Do this now: " + best.title;
}
