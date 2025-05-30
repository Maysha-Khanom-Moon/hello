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



// Global variable to track which week is being edited
let editingWeek = null;

// Get reflections object from localStorage
// Khaja Shoeb Ahmed Mohammad (S370024)
function getReflections() {
  return JSON.parse(localStorage.getItem('reflections') || '{}');
}

// Save reflections object to localStorage
// Khaja Shoeb Ahmed Mohammad (S370024)
function saveReflections(reflections) {
  localStorage.setItem('reflections', JSON.stringify(reflections));
}

// Delete reflection by week
// Md Modasser Hossain (S375173)
function deleteReflection(week) {
  const reflections = getReflections();
  if (confirm('Are you sure you want to delete this reflection?')) {
    delete reflections[week];
    saveReflections(reflections);
    renderReflections();
  }
}

// Edit reflection: populate form with existing data
// Ravi Kumar Kurmi (S372447)
function editReflection(week) {
  const reflections = getReflections();
  document.getElementById('reflection-week').value = week;
  document.getElementById('reflection-text').value = reflections[week];
  editingWeek = week;

  // Change submit button text to "Update Reflection"
  document.querySelector('#reflection-form button[type="submit"]').textContent = 'Update Reflection';
}

// Render all saved reflections
// Minhaz Uddin Ahmed Mayaz (S378194)
function renderReflections() {
  const reflections = getReflections();
  const container = document.getElementById('reflections-container');
  const noMsg = document.getElementById('no-reflections-msg');
  container.innerHTML = '';

  const weeks = Object.keys(reflections).sort((a, b) => b.localeCompare(a));
  if (weeks.length === 0) {
    noMsg.style.display = 'block';
    return;
  }
  noMsg.style.display = 'none';

  weeks.forEach(week => {
    const card = document.createElement('div');
    card.className = 'reflection-card';

    const title = document.createElement('h4');
    title.textContent = `${week}`;

    const text = document.createElement('p');
    text.textContent = reflections[week];

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-reflection';
    editBtn.addEventListener('click', () => editReflection(week));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-reflection';
    deleteBtn.addEventListener('click', () => deleteReflection(week));

    card.append(title, text, editBtn, deleteBtn);
    container.appendChild(card);
  });
}

// Handle form submission: save or update reflection
// Khaja Shoeb Ahmed Mohammad (S370024)
document.getElementById('reflection-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const week = document.getElementById('reflection-week').value;
  const text = document.getElementById('reflection-text').value.trim();
  if (!week || !text) return;

  const reflections = getReflections();

  // If editing and week changed, delete old entry
  if (editingWeek && editingWeek !== week) {
    delete reflections[editingWeek];
  }

  reflections[week] = text;
  saveReflections(reflections);

  // Reset editing state and form
  editingWeek = null;
  this.reset();

  // Reset button text
  this.querySelector('button[type="submit"]').textContent = 'Save Reflection';

  // Show success message
  const msg = document.getElementById('success-msg');
  msg.style.display = 'block';

  renderReflections();

  setTimeout(() => {
    msg.style.display = 'none';
  }, 3000);
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', renderReflections);
