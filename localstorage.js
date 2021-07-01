// variables
var todoForm = document.getElementById('todo-form');
var todoList = document.getElementById('todos');
var doneList = document.getElementById('dones');
var todoInput = document.getElementById('todo-input');
var editInput = document.getElementById('edit-input');
var specialId;
// SITA ATSIKOMENTUOTI PIRMAM UZKROVIMUI
// var duomenys = [{
//         todo: 'Pirmas',
//         done: true,
//         id: 357,
//     },
//     {
//         todo: 'Antras',
//         done: false,
//         id: 89,
//     },
//     {
//         todo: 'Trecias',
//         done: false,
//         id: 68,
//     }
// ];
// duomenys = JSON.stringify(duomenys);
// localStorage.setItem('Sarasas', duomenys);

// spausdinimas is localstorage i HTML
var duomenys = localStorage.getItem('Sarasas');
duomenys = JSON.parse(duomenys);
duomenys.forEach(duomuo => {
    if (duomuo.done == false) {
        var newTodo = `<div class="border border-1 shadow-sm p-3 mb-3  rounded todo-item" data-id="${duomuo.id}">
        <h4 class="mb-3 input-name">${duomuo.todo}</h4>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-todo">Move to Done</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
    </div>`;
        todoList.innerHTML += newTodo;
    } else if (duomuo.done == true) {
        var newTodo = `<div class="border border-1 shadow-sm p-3 mb-3  rounded todo-item" data-id="${duomuo.id}">
        <h4 class="mb-3 input-name">${duomuo.todo}</h4>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-done">Move Back</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
    </div>`;
        doneList.innerHTML += newTodo;
    }
});


// Add todo
todoForm.addEventListener('submit', e => {
    e.preventDefault();
    var duomenys = localStorage.getItem('Sarasas');
    duomenys = JSON.parse(duomenys);
    if (todoInput.value === '') {
        todoInput.classList.add('is-invalid');
    } else {
        todoInput.classList.remove('is-invalid');
        let random = Math.floor(Math.random() * 100000001);
        var newTodo = `<div class="border border-1 shadow-sm p-3 mb-3  rounded todo-item" data-id="${random}">
        <h4 class="mb-3 input-name">${todoInput.value}</h4>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-todo">Move to Done</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
    </div>`;
        duomenys.push({ todo: todoInput.value, done: false, id: random });
        localStorage.setItem('Sarasas', JSON.stringify(duomenys));
        todoList.innerHTML += newTodo;
        todoForm.reset();
    }
});

// Delete todo item / move todo item
document.querySelector('body').addEventListener('click', e => {
    // Delete todo
    if (e.target.classList.contains('delete')) {
        duomenys = JSON.parse(localStorage.getItem('Sarasas'));
        var h4Text = e.target.closest('.todo-item').querySelector('h4').innerText;
        // DARO TA PATI, tik be ID:
        // const pravalyti = duomenys.filter(duomuo => {
        //     return duomuo.todo != h4Text;
        // });
        // localStorage.setItem('Sarasas', JSON.stringify(pravalyti));
        var selectedId = e.target.closest('.todo-item').getAttribute('data-id');
        for (i = 0; i < duomenys.length; i++) {
            if (duomenys[i].todo.indexOf(h4Text) > -1 && duomenys[i].id == selectedId) {
                duomenys.splice([i], 1);
            }
        };
        localStorage.setItem('Sarasas', JSON.stringify(duomenys));
        e.target.closest('.todo-item').remove();
        // move todo to done
    } else if (e.target.classList.contains('move-todo')) {
        var duomenys = localStorage.getItem('Sarasas');
        duomenys = JSON.parse(duomenys);
        doneList.appendChild(e.target.closest('.todo-item'));
        e.target.innerText = 'Move Back';
        e.target.classList.remove('move-todo');
        e.target.classList.add('move-done');
        var h4Text = e.target.closest('.todo-item').querySelector('h4').innerText;
        var selectedId = e.target.closest('.todo-item').getAttribute('data-id');
        duomenys.forEach(duomuo => {
            if (duomuo.todo.indexOf(h4Text) > -1 && duomuo.id == selectedId) {
                duomuo.done = true;
            }
        });
        localStorage.setItem('Sarasas', JSON.stringify(duomenys));
        // move todo to list
    } else if (e.target.classList.contains('move-done')) {
        var duomenys = localStorage.getItem('Sarasas');
        duomenys = JSON.parse(duomenys);
        todoList.appendChild(e.target.closest('.todo-item'));
        var h4Text = e.target.closest('.todo-item').querySelector('h4').innerText;
        e.target.innerText = 'Move to Done';
        e.target.classList.add('move-todo');
        e.target.classList.remove('move-done');
        var selectedId = e.target.closest('.todo-item').getAttribute('data-id');
        duomenys.forEach(duomuo => {
            if (duomuo.todo.indexOf(h4Text) > -1 && duomuo.id == selectedId) {
                duomuo.done = false;
            }
        });
        localStorage.setItem('Sarasas', JSON.stringify(duomenys));
        // Paspaudziam edit mygtuka
    } else if (e.target.classList.contains('edit')) {
        h4 = e.target.closest('.todo-item').querySelector('h4');
        specialId = e.target.closest('.todo-item').getAttribute('data-id');
        var h4text = h4.innerText;
        editInput.value = h4text;
    }
});

// confirm edit todo
document.querySelector('.edit-submit').addEventListener('click', () => {
    var duomenys = localStorage.getItem('Sarasas');
    duomenys = JSON.parse(duomenys);
    var h4Text = h4.innerText;
    duomenys.forEach(duomuo => {
        if (duomuo.todo.indexOf(h4Text) > -1 && duomuo.id == specialId) {
            duomuo.todo = editInput.value;
        }
    });
    localStorage.setItem('Sarasas', JSON.stringify(duomenys));
    h4.innerText = editInput.value;
});