document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-input');
  const list = document.getElementById('task-list');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
      // Criar <li>
      const li = document.createElement('li');
      li.className =
        'flex justify-between items-center bg-white p-3 rounded-md shadow-md mb-2';

      // Texto da tarefa
      const span = document.createElement('span');
      span.textContent = task;
      span.className = 'text-gray-800 text-base';

      // Div dos botões
      const div = document.createElement('div');
      div.className = 'flex gap-2';

      // Botão Editar com ícone
      const editBtn = document.createElement('button');
      editBtn.innerHTML = '<i class="ph ph-pencil-simple"></i> ';
      editBtn.className =
        'flex items-center gap-1 bg-pink-600 text-white px-3 py-2 rounded-md hover:bg-pink-800 transition';
      editBtn.onclick = () => editTask(index);

      // Botão Excluir com ícone
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="ph ph-trash"></i> ';
      deleteBtn.className =
        'flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition';
      deleteBtn.onclick = () => deleteTask(index);

      div.appendChild(editBtn);
      div.appendChild(deleteBtn);
      li.appendChild(span);
      li.appendChild(div);
      list.appendChild(li);
    });

    saveTasks();
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    if (taskText) {
      tasks.push(taskText);
      input.value = '';
      renderTasks();
    }
  });

  window.editTask = (index) => {
    const newTask = prompt('Editar Tarefa:', tasks[index]);
    if (newTask !== null && newTask.trim() !== '') {
      tasks[index] = newTask.trim();
      renderTasks();
    }
  };

  window.deleteTask = (index) => {
    if (confirm('Tem certeza que deseja excluir essa tarefa?')) {
      tasks.splice(index, 1);
      renderTasks();
    }
  };

  renderTasks();
});
