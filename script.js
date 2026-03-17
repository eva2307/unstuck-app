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

  let bestTask = null;
  let bestScore = -Infinity;

  const now = new Date();

  tasks.forEach(t => {
    let score = 0;

    // PRIORITY (vyšší = lepší)
    score += Number(t.priority) * 3;

    // FRICTION (nižší = lepší)
    score += (4 - Number(t.friction)) * 2;

    // DURATION (kratší = lepší)
    const duration = Number(t.duration);
    if (duration > 0) {
      score += Math.max(0, 60 - duration) / 10;
    }

    // DEADLINE (bližší = lepší)
    if (t.deadline) {
      const deadline = new Date(t.deadline);
      const diffHours = (deadline - now) / (1000 * 60 * 60);

      if (diffHours > 0) {
        score += Math.max(0, 24 - diffHours);
      }
    }

    // výběr nejlepšího
    if (score > bestScore) {
      bestScore = score;
      bestTask = t;
    }
  });

  document.getElementById("suggestion").innerText =
    "Do this now: " + bestTask.title;
}
