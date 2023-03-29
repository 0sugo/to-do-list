import _ from 'lodash';
import './style.css';
function component() {
    const element = document.createElement('div');
  
//loadash imported by script
    element.innerHTML = _.join(['', ''], ' ');
    element.classList.add('hello');

  
    return element;
  }
  
  document.body.appendChild(component());

  const tasks = [
    {
      description: 'visit park',
      completed: false,
      index: 1,
    },
    {
      description: 'Take a walk',
      completed: false,
      index: 2,
    },
    {
      description: 'complete project 1',
      completed: false,
      index: 3,
    },
  ];
  
  function renderTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task) => {
      const listItem = document.createElement('li');
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', (event) => {
        task.completed = event.target.checked;
        // eslint-disable-next-line no-use-before-define
        checkAllCompleted();
      });
      listItem.appendChild(checkbox);
  
      const description = document.createElement('span');
      description.innerText = task.description;
      if (task.completed) {
        description.classList.add('completed');
      }
      listItem.appendChild(description);
  
      taskList.appendChild(listItem);
    });
  }
  
  function checkAllCompleted() {
    const allCompleted = tasks.every((task) => task.completed);
    const clearAllButton = document.getElementById('clear-all');
    clearAllButton.disabled = !allCompleted;
  }
  
  renderTaskList();
  checkAllCompleted();