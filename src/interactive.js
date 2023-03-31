import {tasks} from './addRemove'
import {renderTaskList} from './addRemove'

export function updateTaskStatus(task, status) {
    task.completed = status;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }