# 📚 Study Planner Web Application

## 🧩 Overview

The **Study Planner** is a multi-page, responsive web application created for university students to help them manage tasks, reflect weekly, and monitor their academic progress. Built with **HTML, CSS, and JavaScript**, it uses `localStorage` for data persistence, ensuring offline access and data privacy.


## ✅ Features

* 🎯 **Task Management**: Add, view, and delete tasks.
* 🧠 **Weekly Reflection**: Save and delete reflections by week.
* 📊 **Progress Stats**: View completed, pending tasks, and completion rate.
* 💬 **Random Motivation**: Refresh for a new quote on each load.
* 🌐 **Responsive Design**: Optimized for both desktop and mobile screens.


## 🔍 User Testing Summary

**Participants**:

* 3 university students
* 1 parent

**Devices Tested**:

* Windows Laptop (Chrome)
* Samsung Galaxy Phone (Chrome)

| Problem                  | Page       | Feedback                             | Action     |
| ------------------------ | ---------- | ------------------------------------ | ---------- |
| Cannot edit task         | Tasks      | "I want to change task name or date" | ✅ Fixed |
| Cannot delete task       | Tasks      | "How do I remove a task?"            | ✅ Fixed    |
| Cannot edit reflection   | Reflection | "I want to fix my writing"           | ✅ Fixed |
| Cannot delete reflection | Reflection | "I don't want to keep old notes"     | ✅ Fixed    |
| Save buttons look basic  | All Pages  | "The Save buttons look plain"        | ✅ Styled   |
| Header too big on mobile | All Pages  | "Title takes too much space"         | ✅ Fixed    |
| Nav bar not sticky       | All Pages  | "I want the menu to stay"            | ✅ Fixed |


## 🎨 Design Patterns

* **Layout**: Card-based sections for tasks, stats, and reflections.
* **Flexbox**: Responsive layout for all screen sizes.
* **Navigation**: Sticky top menu with page highlighting.


## 💡 UX Principles

### Krug’s Rules

* ✔️ Clear Labels: E.g., “Add Task”
* ✔️ Short Instructions
* ✔️ Minimalist layout

### Nielsen’s Heuristics

* ⚡ Immediate feedback (alerts, confirmations)
* 🧩 Familiar vocabulary
* 🎨 Clean interface

### Morville’s UX Honeycomb

* ✅ Useful, Usable, Findable
* ✅ Accessible: Big text, responsive UI
* ✅ Credible: Stable features
* ✅ Desirable: Emojis and colors
* ✅ Valuable: Saves time and stress


## ♿ Accessibility Testing

### WAVE Tool

| Issue Type      | Count | Notes                               |
| --------------- | ----- | ----------------------------------- |
| Errors          | 1     | Missing label on a form input       |
| Contrast Errors | 8     | Insufficient text contrast          |
| Structural      | 14    | Minor heading structure adjustments |

### Lighthouse Audit

| Area           | Score | Notes                            |
| -------------- | ----- | -------------------------------- |
| Performance    | 100   | Fast load times                  |
| Accessibility  | 95    | Minor label & contrast issues    |
| Best Practices | 100   | Clean code, no issues            |
| SEO            | 90    | Heading order improvement needed |

### Fixes Implemented:

* Added all input labels
* Fixed contrast issues
* Structured headings (h1 → h3)
* Repaired links


## 📁 Project Structure

```
/Final Sprint
├── index.html
├── tasks.html
├── add.html
├── reflection.html
├── /assets
│   ├── css/
│   │   ├── base.css
│   │   └── themes.css
│   ├── js/
│   │   ├── main.js
│   │   ├── tasks.js
│   │   └── quote.js
├── README.md
```


## 🗂 Progress Tracker

| Task                              | Page       | Status      |
| --------------------------------- | ---------- | ----------- |
| Add delete button for tasks       | Tasks      | ✅ Completed |
| Add delete button for reflections | Reflection | ✅ Completed |
| Style save buttons                | All        | ✅ Completed |
| Responsive mobile header          | All        | ✅ Completed |
| Edit task feature                 | Tasks      | ✅ Completed |
| Edit reflection feature           | Reflection | ✅ Completed |
| Sticky navbar                     | All        | ✅ Completed |
| Final accessibility fixes         | All        | ✅ Completed |
| Connect quotes to real API        | Dashboard  | ✅ Completed |
| Add dark/light mode               | All        | ✅ Completed |
| Split JS into modules             | All        | ✅ Completed |


## 💻 Key Code Snippets

### 🗑 Delete Task (tasks.js)

```javascript
function deleteTask(index) {
  const tasks = getTasks();
  if (confirm('Are you sure you want to delete this task?')) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }
}
```

### 🗑 Delete Reflection (reflection.js)

```javascript
function deleteReflection(week) {
  const reflections = getReflections();
  if (confirm('Are you sure you want to delete this reflection?')) {
    delete reflections[week];
    saveReflections(reflections);
    renderReflections();
  }
}
```

### 🎨 Styled Save Button (styles.css)

```css
.btn {
  background-color: #1976d2;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}
```

### 📱 Mobile Header Adjustment (styles.css)

```css
@media (max-width: 600px) {
  header h1 {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  nav ul {
    font-size: 0.7rem;
    flex-direction: row;
    gap: 2px;
  }
}

```

### ✏️ Edit Task Feature (tasks.js)
```javascript
editBtn.addEventListener('click', () => {
  if (!inEditMode) {
    // Enter Edit Mode
    title.style.display = 'none';
    titleInput.style.display = 'inline-block';
    due.style.display = 'none';
    dueInput.style.display = 'inline-block';
    editBtn.textContent = '💾 Save';
  } else {
    // Save changes
    const newTitle = titleInput.value.trim();
    const newDue = dueInput.value;
    if (!newTitle) return alert('Task title cannot be empty.');
    tasks[index].title = newTitle;
    tasks[index].due = newDue || null;
    saveTasks(tasks);
    renderTasks();
  }
});

```


### 🖊️ Edit Reflection Feature (reflection.js)
```javascript
function editReflection(week) {
  const reflections = getReflections();
  document.getElementById('reflection-week').value = week;
  document.getElementById('reflection-text').value = reflections[week];
  editingWeek = week;

  document.querySelector('#reflection-form button[type="submit"]').textContent = 'Update Reflection';
}
```

### 📌 Sticky Navbar (styles.css)

```css
nav {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1000;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
}
```


## 📝 Acknowledgements

* Layout inspired by **Google Material Design**
* Quote functionality referenced from **Stack Overflow**
* `localStorage` and form validation guidance from **W3Schools**
* Emojis and Unicode icons used throughout the UI
 
