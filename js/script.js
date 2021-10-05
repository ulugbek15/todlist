const elList = document.querySelector('.todo__list');

// Form elements
const elForm = document.querySelector(".form");
const elFormInput = elForm.querySelector(".form__input");

const elTemplate = document.querySelector('#template').content;


let todosStorage = JSON.parse(window.localStorage.getItem('todos'));

let todos = todosStorage || [];

window.addEventListener('storage', (e) =>{
    console.log(JSON.parse(e.newValue))
})

function renderTodos(arr, element){

    element.innerHTML = null;

    arr.forEach((todo) =>{
        const cloneTemplate = elTemplate.cloneNode(true)

        let checkbox = cloneTemplate.querySelector('.todo__checkbox')
        checkbox.dataset.id = todo.id
        checkbox.checked = todo.isCompleted
        let todoTitle = cloneTemplate.querySelector('.todo__title')
        todoTitle.textContent = todo.content
        let deleteBtn = cloneTemplate.querySelector('.todo__button')
        deleteBtn.dataset.id = todo.id

        checkbox.addEventListener('click', (e) =>{
            const itemId = e.target.dataset.id

            const findTodo = todos.find(todo => todo.id == itemId)

            findTodo.isCompleted = !findTodo.isCompleted

             window.localStorage.setItem('todos', JSON.stringify(todos))
             renderTodos(todos, elList)
        })

        deleteBtn.addEventListener('click', (e) =>{
            let itemId = e.target.dataset.id

            const findTodo = todos.findIndex(todo => todo.id == itemId)
            
            todos.splice(findTodo, 1)

            window.localStorage.setItem('todos', JSON.stringify(todos))
            
            renderTodos(todos, elList)

        })
        
        element.appendChild(cloneTemplate)
    })
    
}

elForm.addEventListener('submit', e =>{
    e.preventDefault();

    let inputValue = elFormInput.value.trim();

    let newObject = {
        id: new Date().getTime(),
        content: inputValue,
        isCompleted: false
    }

    elFormInput.value = null;
    
    todos.unshift(newObject)

    window.localStorage.setItem('todos', JSON.stringify(todos))

    renderTodos(todos, elList)
})

renderTodos(todos, elList)
