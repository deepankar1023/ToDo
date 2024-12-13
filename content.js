let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add a task
function addTask(task) {
    tasks.push({ id: Date.now(), text: toCamelCase(task), done: false });
    saveTasks();
    renderTasks();
}

// Update a task
function updateTask(id, newText) {
    tasks = tasks.map(task => task.id === id ? { ...task, text: toCamelCase(newText) } : task);
    saveTasks();
    renderTasks();
}

// Remove a task
function removeTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Mark a task as done
function toggleDone(id) {
    tasks = tasks.map(task => task.id === id ? { ...task, done: !task.done } : task);
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks to the UI
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
      const taskItem = document.createElement('div');
      taskItem.className = `task ${task.done ? 'done' : ''}`;
      taskItem.style.display = 'flex';
      taskItem.style.justifyContent = 'space-between';

      const leftPart = document.createElement('div');
      leftPart.style.display = 'flex';
      leftPart.style.alignItems = 'center';

      const serialNumber = document.createElement('span');
      serialNumber.textContent = `${index + 1}. `;
      serialNumber.style.fontWeight = 'bold';
      serialNumber.style.marginRight = '10px';
      leftPart.appendChild(serialNumber);

      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      taskText.style.fontSize = '18px';
      leftPart.appendChild(taskText);

      taskItem.appendChild(leftPart);

      const rightPart = document.createElement('div');
      
      const editButton = document.createElement('button');
      editButton.textContent = 'E';
      editButton.style.fontSize = '12px';
      editButton.style.padding = '5px';
      editButton.style.marginLeft = '5px';
      editButton.onclick = () => {
          const newText = prompt('Edit task:', task.text);
          if (newText) updateTask(task.id, newText);
      };
      rightPart.appendChild(editButton);

      const doneButton = document.createElement('button');
      doneButton.textContent = task.done ? 'U' : 'D';
      doneButton.style.fontSize = '12px';
      doneButton.style.padding = '5px';
      doneButton.style.marginLeft = '5px';
      doneButton.onclick = () => toggleDone(task.id);
      rightPart.appendChild(doneButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'X';
      deleteButton.style.fontSize = '12px';
      deleteButton.style.padding = '5px';
      deleteButton.style.marginLeft = '5px';
      deleteButton.onclick = () => removeTask(task.id);
      rightPart.appendChild(deleteButton);

      taskItem.appendChild(rightPart);

      taskList.appendChild(taskItem);
  });
}

// Convert text to Camel Case
function toCamelCase(text) {
  return text
      .toLowerCase()
      .split(' ')
      .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
}

// Attach handlers to the DOM
document.getElementById('addTaskButton').onclick = () => {
  const taskInput = document.getElementById('taskInput');
  if (taskInput.value) {
      addTask(taskInput.value);
      taskInput.value = '';
  }
};

// Initial render
renderTasks();