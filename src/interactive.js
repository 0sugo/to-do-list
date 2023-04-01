import { tasks, renderTaskList } from './addRemove';

export function updateTaskStatus(task, status) {
  task.completed = status;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function clearAllChecked() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const uncheckedTasks = tasks.filter((task) => !task.checked);
  localStorage.setItem('tasks', JSON.stringify(uncheckedTasks));
}