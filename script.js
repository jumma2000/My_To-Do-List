// الحصول على العناصر
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// تحميل المهام من التخزين المحلي عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', loadTasks);

// إضافة مهمة جديدة
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (taskText) {
        const task = {
            text: taskText,
            dueDate: dueDate,
            id: Date.now() // استخدام الوقت الحالي كمعرف للمهام
        };

        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        taskInput.value = ''; // مسح حقل الإدخال
        dueDateInput.value = ''; // مسح حقل الإدخال
    } else {
        alert('يرجى إدخال مهمة.');
    }
});

// إضافة مهمة إلى DOM
function addTaskToDOM(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('data-id', task.id);

    taskDiv.innerHTML = `
        <span>${task.text} (تاريخ الاستحقاق: ${task.dueDate ? task.dueDate : "لا يوجد"})</span>
        <div>
            <span class="edit">✏️</span>
            <span class="remove">×</span>
        </div>
    `;

    // إضافة مهمة إلى القائمة
    taskList.appendChild(taskDiv);

    // إزالة المهمة عند النقر على "×"
    taskDiv.querySelector('.remove').addEventListener('click', function() {
        taskList.removeChild(taskDiv);
        removeTaskFromLocalStorage(task.id);
    });

    // تعديل المهمة عند النقر على "✏️"
    taskDiv.querySelector('.edit').addEventListener('click', function() {
        taskInput.value = task.text;
        dueDateInput.value = task.dueDate;
        removeTaskFromLocalStorage(task.id);
        taskList.removeChild(taskDiv);
    });
}

// حفظ المهمة في التخزين المحلي
function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// تحميل المهام من التخزين المحلي
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => addTaskToDOM(task));
}

// الحصول على المهام من التخزين المحلي
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

// إزالة المهمة من التخزين المحلي
function removeTaskFromLocalStorage(taskId) {
    const tasks = getTasksFromLocalStorage().filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}