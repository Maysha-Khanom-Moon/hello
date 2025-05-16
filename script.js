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


// Utility: get tasks array from localStorage
// Khaja Shoeb Ahmed Mohammad (S370024)
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

// Save and show user name
// Khaja Shoeb Ahmed Mohammad (S370024)
function saveName() {
  const nameInput = document.getElementById('nameInput');
  const name = nameInput.value.trim();
  if (name) {
    localStorage.setItem('userName', name);
    renderName();
  }
}

// Render welcome message
// Minhaz Uddin Ahmed Mayaz (S378194)
function renderName() {
  const storedName = localStorage.getItem('userName');
  const welcomeMessage = document.getElementById('welcome-message');
  const nameInput = document.getElementById('nameInput');
  const saveBtn = document.getElementById('saveNameBtn');
  if (storedName) {
    welcomeMessage.textContent = `Welcome back, ${storedName}! 👋`;
    nameInput.style.display = 'none';
    saveBtn.style.display = 'none';
  }
}

// Load and render task summary
// Minhaz Uddin Ahmed Mayaz (S378194)
function renderSummary() {
  const tasks = getTasks();
  const doneCount = tasks.filter(t => t.status === 'Completed').length;
  const pendingCount = tasks.filter(t => t.status !== 'Completed').length;
  const total = tasks.length;
  const percent = total ? Math.round((doneCount / total) * 100) : 0;

  document.getElementById('done-count').textContent = doneCount;
  document.getElementById('pending-count').textContent = pendingCount;
  document.getElementById('percent-complete').textContent = `${percent}%`;
}

// Render upcoming deadlines
// Minhaz Uddin Ahmed Mayaz (S378194)
function renderDeadlines() {
  const tasks = getTasks()
    .filter(t => t.due)
    .map(t => ({ ...t, dueDate: new Date(t.due) }))
    .filter(t => t.dueDate >= new Date())
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, 3);
  const list = document.getElementById('deadline-list');
  list.innerHTML = '';
  if (tasks.length === 0) {
    list.innerHTML = '<li>No upcoming deadlines</li>';
    return;
  }
  tasks.forEach(t => {
    const now = new Date();
    const diff = Math.ceil((t.dueDate - now) / (1000 * 60 * 60 * 24));
    let label;
    if (diff === 0) label = 'Due Today';
    else if (diff === 1) label = 'Due Tomorrow';
    else label = `Due in ${diff} days`;

    const li = document.createElement('li');
    li.innerHTML = `<strong>${t.title}:</strong> ${label}`;
    list.appendChild(li);
  });
}

// Load random quote
// Minhaz Uddin Ahmed Mayaz (S378194)
function loadQuote() {
  const quotes = [
    "Push yourself, because no one else is going to do it for you.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Great things never come from comfort zones.",
    "Believe in yourself and all that you are.",
    "Small steps every day lead to big results.",
    "You are capable of more than you know.",
    "Work hard in silence, let your success be your noise.",
    "Don’t limit your challenges. Challenge your limits.",
    "Stay focused and never give up.",
    "Every accomplishment starts with the decision to try.",
    "Discipline is the bridge between goals and accomplishment.",
    "Keep going. Everything you need will come to you.",
    "Dream it. Wish it. Do it.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Focus on your goal. Don’t look in any direction but ahead.",
    "Doubt kills more dreams than failure ever will.",
    "The secret to getting ahead is getting started.",
    "Push through the pain. Your future self will thank you.",
    "You don’t have to be perfect, just consistent.",
    "Hard work beats talent when talent doesn’t work hard.",
    "Winners are not people who never fail but people who never quit.",
    "You miss 100% of the shots you don’t take.",
    "Act as if what you do makes a difference. It does.",
    "It always seems impossible until it’s done.",
    "Start where you are. Use what you have. Do what you can.",
    "Make today so awesome that yesterday gets jealous.",
    "Be stronger than your excuses.",
    "If it doesn’t challenge you, it won’t change you.",
    "Your only limit is your mind.",
    "Don't be afraid to give up the good to go for the great.",
    "Success usually comes to those who are too busy to be looking for it.",
    "Opportunities don't happen, you create them.",
    "Sometimes later becomes never. Do it now.",
    "Great minds discuss ideas; average minds discuss events; small minds discuss people.",
    "Don’t wait for opportunity. Create it.",
    "Strive for progress, not perfection.",
    "You’ve got this.",
    "The only way to do great work is to love what you do.",
    "Stop wishing. Start doing.",
    "Failure is not the opposite of success. It’s part of success.",
    "Your future is created by what you do today, not tomorrow.",
    "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
    "Success isn’t overnight. It’s when every day you get a little better than the day before.",
    "Big journeys begin with small steps.",
    "Don’t compare your beginning to someone else’s middle.",
    "Difficult roads often lead to beautiful destinations.",
    "Stay patient and trust your journey."
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById('quote-text').textContent = quotes[randomIndex];
}


// Initialize
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('saveNameBtn').addEventListener('click', saveName);
  renderName();
  loadQuote();
  renderSummary();
  renderDeadlines();
});