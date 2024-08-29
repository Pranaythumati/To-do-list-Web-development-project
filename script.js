"use strict";

// Selecting DOM elements
var ul = document.querySelector('#list');
var taskCount = document.querySelector('.count');
var msg = document.querySelector('.errormsg');

// Function to update task count
function TaskCount() {
    taskCount.textContent = `You have ${ul.children.length} task(s).`;
}

// Function to add a new task
function ajouter() {
    // Get the value from the input field
    var el = document.querySelector('#input').value;

    // Create a new list item
    var li = document.createElement('li');
    li.classList.add('task-item', 'fade-enter');

    // Create delete, edit, and checkbox icons
    var deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = '<i class="fas fa-times text-red-500 cursor-pointer"></i>';
    var checkboxIcon = document.createElement('span');
    checkboxIcon.innerHTML = '<i class="far fa-circle checkbox-circle unchecked-checkbox"></i>';

    // Append icons and task text to the list item
    li.appendChild(checkboxIcon);
    var taskText = document.createElement('span');
    taskText.textContent = el;
    taskText.classList.add('task-text');
    li.appendChild(taskText);
    li.appendChild(deleteIcon);

    // Add the new task to the list or display an error message if the input is empty
    if (el === '') {
        msg.classList.remove('hidden');
    } else {
        msg.classList.add('hidden');
        ul.appendChild(li);
        document.querySelector('#input').value = '';
        TaskCount();

        // Trigger reflow for animation
        li.offsetHeight;
        li.classList.remove('fade-enter');
    }

    // Event listeners for delete and checkbox icons
    deleteIcon.addEventListener('click', function () {
        li.classList.add('fade-exit-active');
        li.addEventListener('transitionend', () => {
            li.remove();
            TaskCount();
        });
    });

    checkboxIcon.addEventListener('click', function () {
        var checkbox = checkboxIcon.firstChild;
        var taskText = li.querySelector('.task-text');
        if (checkbox.classList.contains('unchecked-checkbox')) {
            checkbox.classList.remove('fa-circle');
            checkbox.classList.add('fa-check-circle');
            checkbox.classList.remove('unchecked-checkbox');
            checkbox.classList.add('checked-checkbox');
            li.classList.add('completed-task');
        } else {
            checkbox.classList.add('fa-circle');
            checkbox.classList.remove('fa-check-circle');
            checkbox.classList.add('unchecked-checkbox');
            checkbox.classList.remove('checked-checkbox');
            li.classList.remove('completed-task');
        }
    });
}

// Event listener for the "Add" button
document.querySelector('#add').addEventListener('click', ajouter);
