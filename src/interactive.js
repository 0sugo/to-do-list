const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

export function updateTaskStatus(task, status) {
  task.completed = status;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function checkAllCompleted() {
  const anyCompleted = tasks.some((task) => task.completed);
  const clearAllButton = document.getElementById('clear-all');
  clearAllButton.disabled = !anyCompleted;
  clearAllButton.addEventListener('click', () => {
    const completedTasks = tasks.filter((task) => task.completed);
    const remainingTasks = tasks.filter((task) => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(remainingTasks));
    completedTasks.forEach((task) => {
      const index = tasks.indexOf(task);
      tasks.splice(index, 1);
    });
    checkAllCompleted();
    window.location.reload();
  });
}
