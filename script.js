
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('.todos-container');
    const taskForm = document.querySelector('.input-area');

    const toggleEmptyState = () => {
        emptyImage.style.display =
            taskList.children.length === 0 ? 'block' : 'none';

        todosContainer.style.width =
            taskList.children.length > 0 ? '100%' : '50%';
    };

    const addTask = (text, completed = false) => {
        const taskText = text || taskInput.value.trim();

        if (!taskText) return;

        const li = document.createElement('li');

        li.innerHTML = `
            <input type="checkbox" class="checkbox"
                ${completed ? 'checked' : ''} />

            <span></span>

            <div class="task-buttons">
                <button type="button" class="edit-btn">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button type="button" class="delete-btn">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        li.querySelector('span').textContent = taskText;

        const checkbox = li.querySelector('.checkbox');
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        const updateCompletedState = () => {
            const isChecked = checkbox.checked;

            li.classList.toggle('completed', isChecked);
            editBtn.disabled = isChecked;
            editBtn.style.opacity = isChecked ? '0.5' : '1';
            editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';
        };

        checkbox.addEventListener('change', updateCompletedState);

        updateCompletedState();

        editBtn.addEventListener('click', () => {
            if (checkbox.checked) return;

            taskInput.value = li.querySelector('span').textContent;
            li.remove();
            toggleEmptyState();
            taskInput.focus();
        });

        deleteBtn.addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        toggleEmptyState();
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });

    toggleEmptyState();
});
