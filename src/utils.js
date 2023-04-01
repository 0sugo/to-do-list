export const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function updateTaskStatus(task, status) {
  task.completed = status;
}

export function checkAllCompleted() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const allCompleted = tasks.every((task) => task.completed);
  const checkAll = document.getElementById('check-all');
  checkAll.checked = allCompleted;
}
