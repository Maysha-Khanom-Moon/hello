const toggleBtn = document.getElementById('darkModeToggle');

// Toggle dark mode on click
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
    toggleBtn.textContent = '☀️';
  } else {
    localStorage.setItem('darkMode', 'disabled');
    toggleBtn.textContent = '🌙';
  }
});


// Retrieve tasks array
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

// Save tasks array
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add delete button functionality
function deleteTask(index) {
  const tasks = getTasks();
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }
}

// Render all tasks
function renderTasks() {
  const tasks = getTasks();
  const container = document.getElementById('tasks-list');
  const noTasksMsg = document.getElementById('no-tasks-msg');

  container.innerHTML = '';
  if (tasks.length === 0) {
    noTasksMsg.style.display = 'block';
    return;
  }
  noTasksMsg.style.display = 'none';

  tasks.forEach((task, index) => {
    const card = document.createElement('div');
    card.className = 'task-card';

    // Create editable title container
    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';

    const title = document.createElement('h3');
    title.textContent = task.title;
    title.style.display = 'inline-block';

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = task.title;
    titleInput.style.display = 'none';

    titleContainer.append(title, titleInput);

    // Subject (not editable)
    const subject = document.createElement('p');
    subject.textContent = `Subject: ${task.subject}`;

    // Due date container (editable)
    const dueContainer = document.createElement('div');
    dueContainer.className = 'due-container';

    const due = document.createElement('p');
    due.className = 'due';
    due.textContent = task.due ? `Due: ${new Date(task.due).toLocaleDateString()}` : 'No due date';
    due.style.display = 'inline-block';

    const dueInput = document.createElement('input');
    dueInput.type = 'date';
    dueInput.value = task.due ? new Date(task.due).toISOString().slice(0, 10) : '';
    dueInput.style.display = 'none';

    dueContainer.append(due, dueInput);

    // Status
    const status = document.createElement('p');
    status.textContent = `Status: ${task.status}`;

    // Buttons container
    const btnContainer = document.createElement('div');
    btnContainer.className = 'btn-container';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-task';

    // Done button
    const doneBtn = document.createElement('button');
    if (task.status === 'Completed') {
      doneBtn.textContent = 'Done';
      doneBtn.className = 'disabled';
      doneBtn.disabled = true;
    } else {
      doneBtn.textContent = 'Mark as Done';
      doneBtn.className = 'mark-done';
      doneBtn.addEventListener('click', () => {
        tasks[index].status = 'Completed';
        saveTasks(tasks);
        renderTasks();
      });
    }

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-task';
    deleteBtn.addEventListener('click', () => deleteTask(index));

    btnContainer.append(doneBtn, editBtn, deleteBtn);

    // Append all
    card.append(titleContainer, subject, dueContainer, status, btnContainer);
    container.appendChild(card);

    // Edit button functionality
    editBtn.addEventListener('click', () => {
      const inEditMode = titleInput.style.display === 'inline-block';
      if (!inEditMode) {
        // Switch to edit mode
        title.style.display = 'none';
        titleInput.style.display = 'inline-block';
        due.style.display = 'none';
        dueInput.style.display = 'inline-block';
        editBtn.textContent = 'Save';

        // Optionally add a Cancel button
        let cancelBtn = card.querySelector('.cancel-task');
        if (!cancelBtn) {
          cancelBtn = document.createElement('button');
          cancelBtn.textContent = 'Cancel';
          cancelBtn.className = 'cancel-task';
          btnContainer.appendChild(cancelBtn);

          cancelBtn.addEventListener('click', () => {
            // Revert edits
            titleInput.value = task.title;
            dueInput.value = task.due ? new Date(task.due).toISOString().slice(0, 10) : '';

            title.style.display = 'inline-block';
            titleInput.style.display = 'none';
            due.style.display = 'inline-block';
            dueInput.style.display = 'none';

            editBtn.textContent = 'Edit';
            cancelBtn.remove();
          });
        }
      } else {
        // Save changes
        const newTitle = titleInput.value.trim();
        const newDue = dueInput.value;

        if (newTitle === '') {
          alert('Task title cannot be empty.');
          return;
        }

        tasks[index].title = newTitle;
        tasks[index].due = newDue ? newDue : null;

        saveTasks(tasks);
        renderTasks();
      }
    });
  });
}


// Initialize
window.addEventListener('DOMContentLoaded', renderTasks);