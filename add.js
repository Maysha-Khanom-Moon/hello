const toggleBtn = document.getElementById('darkModeToggle');


// Load dark mode state on page load
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️'; // Set icon to sun
}


// Toggle dark mode on click
// Md Modasser Hossain (S375173)
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


// Get existing tasks from localStorage
// Khaja Shoeb Ahmed Mohammad (S370024)
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

// Save tasks array to localStorage
// Khaja Shoeb Ahmed Mohammad (S370024)
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Handle form submission
// Khaja Shoeb Ahmed Mohammad (S370024)
document.getElementById('add-task-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const title = document.getElementById('task-title').value.trim();
  const subject = document.getElementById('task-subject').value.trim();
  const due = document.getElementById('task-due').value;
  const priority = document.getElementById('task-priority').value;

  // Create new task object
  const newTask = {
    title,
    subject,
    due,
    priority,
    status: 'Pending'
  };

  // Save to localStorage
  const tasks = getTasks();
  tasks.push(newTask);
  saveTasks(tasks);

  // Show success message and reset form
  const msg = document.getElementById('success-msg');
  msg.style.display = 'block';
  this.reset();

  // Hide message after 3 seconds
  setTimeout(() => { msg.style.display = 'none'; }, 3000);
});