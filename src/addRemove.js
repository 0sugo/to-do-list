import _ from 'lodash';
import './style.css';
import { updateTaskStatus, checkAllCompleted } from './interactive.js';

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskList = document.getElementById('task-list');

function component() {
  const element = document.createElement('div');

  // lodash imported by script
  element.innerHTML = _.join(['', ''], ' ');
  return element;
}

document.body.appendChild(component());

// able and disable button

// render infor to html
function renderTaskList() {
  taskList.innerHTML = '';
  // const task = JSON.parse(localStorage.getItem('tasks')) || [];

  tasks.forEach((task, index) => {
    task.index = index;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const svgDelete = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const listItem = document.createElement('li');
    listItem.id = 'identifier';

    // function to re assign indexes
    function assignIndexesToLocalTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks'));

      tasks.forEach((task, index) => {
        task.index = index;
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // add a draggable attribute to the li element
    listItem.draggable = true;

    // set up the dragstart event listener to store the task index in the dataTransfer object
    listItem.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', index);
      event.dataTransfer.effectAllowed = 'move';
    });

    // set up the dragover event listener to allow the li element to be dropped on top of it
    listItem.addEventListener('dragover', (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    });

    // set up the drop event listener to swap the positions of the dragged task and the dropped task
    listItem.addEventListener('drop', (event) => {
      event.preventDefault();
      const sourceIndex = event.dataTransfer.getData('text/plain');
      if (sourceIndex !== index) {
        const sourceTask = tasks[sourceIndex];
        const targetTask = tasks[index];
        tasks[sourceIndex] = targetTask;
        tasks[index] = sourceTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        assignIndexesToLocalTasks();
        renderTaskList();
      }
    });

    // update the indexes of the list items
    const listItems = document.querySelectorAll('.task');
    listItems.forEach((listItem) => {
    // retrieve the index from the list item's id attribute
      const taskIndex = parseInt(listItem.id.split('-')[1], 10);
      listItem.dataset.index = taskIndex;
      renderTaskList();
    });

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', (event) => {
      updateTaskStatus(task, event.target.checked);
      checkAllCompleted();
      window.location.reload();
      localStorage.setItem('tasks', JSON.stringify(tasks));
      if (event.target.checked) {
        listItem.classList.add('completed');
        checkAllCompleted();
        // listItem.style.textDecoration = 'line-through';
      } else {
        listItem.classList.remove('completed');
        // listItem.style.textDecoration = 'unset';
      }
    });
    listItem.appendChild(checkbox);

    const description = document.createElement('span');
    description.innerText = task.description;
    if (task.completed) {
      description.classList.add('completed');
    }
    listItem.appendChild(description);

    const editButton = document.createElement('button');
    editButton.id = 'edit';

    listItem.appendChild(editButton);

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.description;
    editInput.style.display = 'none';
    listItem.appendChild(editInput);

    listItem.addEventListener('click', (event) => {
      if (event.target.id === 'edit') {
        description.style.display = 'none';
        editInput.style.display = 'inline-block';
        editInput.focus();
        listItem.style.backgroundColor = '#326789';
        svg.style.display = 'none';
      }
    });

    editInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const newDescription = editInput.value.trim();
        if (newDescription !== '') {
          task.description = newDescription;
          description.innerText = newDescription;
          description.style.display = 'inline-block';
          editInput.style.display = 'none';
          svgDelete.style.display = 'none';
          listItem.style.backgroundColor = 'unset';
          svg.style.display = 'unset';
          localStorage.setItem('tasks', JSON.stringify(tasks));
        }
      }
    });

    listItem.appendChild(editInput);

    // create a new SVG element
    svg.id = 'savg';
    svg.setAttribute('style', 'cursor: default;'); // set default cursor
    svg.addEventListener('mouseover', () => {
      svg.style.cursor = 'move'; // set move cursor on hover
    });
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('stroke-width', '1.5');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('class', 'w-6 h-6');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '32');

    // create a new path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('d', 'M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z');

    // add the path element to the SVG element
    svg.appendChild(path);
    listItem.appendChild(svg);

    // add event listener to SVG element
    description.addEventListener('click', () => {
      editButton.click();
      svgDelete.style.display = 'block';
    });

    // add event listener to edit button
    editButton.addEventListener('click', () => {
      description.style.display = 'none';
      editInput.style.display = 'inline-block';
      editInput.focus();
    });

    svgDelete.style.display = 'none';
    svgDelete.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgDelete.setAttribute('fill', 'none');
    svgDelete.setAttribute('viewBox', '0 0 24 24');
    svgDelete.setAttribute('stroke-width', '1.5');
    svgDelete.setAttribute('stroke', 'currentColor');
    svgDelete.setAttribute('class', 'w-6 h-6 svgDelete'); // add a new class name "svgDelete"
    svgDelete.setAttribute('width', '18');
    svgDelete.setAttribute('height', '32');

    const pathDelete = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathDelete.setAttribute('stroke-linecap', 'round');
    pathDelete.setAttribute('stroke-linejoin', 'round');
    pathDelete.setAttribute('d', 'M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0');
    svgDelete.appendChild(pathDelete);
    listItem.appendChild(svgDelete);

    svgDelete.addEventListener('click', () => {
      const index = tasks.findIndex((t) => t.index === task.index);
      if (index > -1) {
        tasks.splice(index, 1);
        renderTaskList();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        listItem.remove();
      }
    });

    taskList.appendChild(listItem);
  });
}
window.onload = function onload() {
  renderTaskList();
  checkAllCompleted();
};

renderTaskList();
checkAllCompleted();

const myForm = document.getElementById('myform');
myForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const individualTask = document.getElementById('individualTask').value;
  if (individualTask.trim() !== '') {
    const newObj = {
      description: individualTask,
      completed: false,
      index: tasks.length,
    };
    tasks.push(newObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // clear input field
    document.getElementById('individualTask').value = '';

    renderTaskList();
    checkAllCompleted();
  }
});
