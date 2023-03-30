import _ from 'lodash';
import './style.css';

function component() {
  const element = document.createElement('div');

  // loadash imported by script
  element.innerHTML = _.join(['', ''], ' ');
  return element;
}

document.body.appendChild(component());
let index = 0;
const tasks = [
//   {
//     description: 'visit park',
//     completed: false,
//     index: 1,
//   },
//   {
//     description: 'Take a walk',
//     completed: false,
//     index: 2,
//   },
//   {
//     description: 'complete project 1',
//     completed: false,
//     index: 3,
//   },
];

// fetch information from form


// fetch store && to array
function attacher(){
    let completed = false;
    let newObj = {
      description: 'kwera',
      completed: false,
      index: index,
    }
    let newObj2 = {
        description: 'kwera',
        completed: false,
        index: index,
      }
    
    tasks.push(newObj);
    tasks.push(newObj2);
    

    // const adder = document.getElementById('adder');
    
}

//rendering info to html
function renderTaskList() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task,index) => {
    task.index = index;
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
  console.log(tasks);
  index+=index;
}

// Check if all tasks are completed to activate button
function checkAllCompleted() {
  const allCompleted = tasks.every((task) => task.completed);
  const clearAllButton = document.getElementById('clear-all');
  clearAllButton.disabled = !allCompleted;
}


attacher();
renderTaskList();
checkAllCompleted();
