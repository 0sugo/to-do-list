
import _ from 'lodash';
import './addRemove.js';
import './style.css';

function component() {
  const element = document.createElement('div');

  // loadash imported by script
  element.innerHTML = _.join(['', ''], ' ');
  return element;
}

document.body.appendChild(component());

let index = 0;
const tasks = [];

// fetch information from form


// fetch store && to array
// let individualTask = '';
const myForm = document.getElementById('myform');
myForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const individualTask = document.getElementById('individualTask').value;
  if (individualTask.trim() !== '') {
    const newObj = {
      description: individualTask,
      completed: false,
      index: index,
    };
    tasks.push(newObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // clear input field
    document.getElementById('individualTask').value = '';

    renderTaskList();
    checkAllCompleted();
  }
});





//rendering info to html
function renderTaskList() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task,index) => {
    task.index = index;
    const listItem = document.createElement('li');
    listItem.id = 'identifier';

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

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.id = 'edit';
    editButton.addEventListener('click', () => {
      description.style.display = 'none';
      editInput.style.display = 'inline-block';
      editInput.focus();
    });
    listItem.appendChild(editButton);

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = task.description;
    editInput.style.display = 'none';
    editInput.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        const newDescription = editInput.value.trim();
        if (newDescription !== '') {
          task.description = newDescription;
          description.innerText = newDescription;
          description.style.display = 'inline-block';
          editInput.style.display = 'none';
          localStorage.setItem('tasks', JSON.stringify(tasks));

        }
      }
    });
    listItem.appendChild(editInput);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.id = 'delete';
    deleteButton.addEventListener('click', () => {
      const index = tasks.findIndex((t) => t.index === task.index);
      if (index > -1) {
        tasks.splice(index, 1);
        renderTaskList();
        checkAllCompleted();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    });
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });


}

// Check if all tasks are completed to activate button
function checkAllCompleted() {
    const allCompleted = tasks.every((task) => task.completed);
    const clearAllButton = document.getElementById('clear-all');
    clearAllButton.disabled = !allCompleted;
    clearAllButton.addEventListener('click', () => {
      if (!clearAllButton.disabled) {
        tasks.length = 0;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTaskList();
        checkAllCompleted();
      }
    });
  }

// clear all array
  // deleting tasks
  let identifier = document.getElementById('identifier');
identifier.addEventListener('clicked', function(){
    function deleteTasks(){
        let currentIndex = -1;
        for (let i = 0; i < tasks.length; i+=1) {
            const{desiredDescription,desiredCompleted,desiredIndex} = tasks[i];
            if(desiredDescription===tasks[i].description &&desiredIndex===tasks[i].index){
                currentIndex = i;
                break;
            }
            
        }
        tasks.splice(currentIndex,1);
        updateTaskIndexes();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    
    }
    

});