const taskNameInput = document.getElementById("taskName");
const addTaskBtn = document.getElementById("addTaskBtn");
const messageDiv = document.getElementById("message");

const todoColumn = document.getElementById("todo");
const inProgressColumn = document.getElementById("inProgress");
const completedColumn = document.getElementById("completed");

let draggedTask = null;
addTaskBtn.addEventListener("click", () => {
  const name = taskNameInput.value.trim();
  if (!name) return;

  const taskCard = createTaskCard(name);
  todoColumn.appendChild(taskCard);

  taskNameInput.value = "";
});
function createTaskCard(name) {
  const card = document.createElement("div");
  card.classList.add("task-card");
  card.setAttribute("draggable", "true");

  const title = document.createElement("p");
  title.textContent = name;

  const date = document.createElement("p");
  const now = new Date();
  date.textContent = now.toLocaleString();

  card.appendChild(title);
  card.appendChild(date);
  card.addEventListener("dragstart", onDragStart);
  card.addEventListener("dragend", onDragEnd);

  return card;
}
function onDragStart(e) {
  draggedTask = e.target;
  e.dataTransfer.effectAllowed = "move";
}

function onDragEnd() {
  draggedTask = null;
}
[todoColumn, inProgressColumn, completedColumn].forEach((col) => {
  col.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  col.addEventListener("drop", (e) => {
    e.preventDefault();
    if (!draggedTask) return;

    col.appendChild(draggedTask);
    if (col === completedColumn) {
      draggedTask.classList.add("completed");
      showCompletionMessage("Task Completed Successfully");
    }
  });
});
function showCompletionMessage(text) {
  messageDiv.textContent = text;
  setTimeout(() => {
    messageDiv.textContent = "";
  }, 3000);
}
