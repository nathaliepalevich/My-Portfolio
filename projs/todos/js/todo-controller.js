
function onInit() {
    createTodos();
    renderTodos();
    doTrans();
}

function renderTodos() {
    
    var todos = getTodosForDisplay();
    var elTodoList = document.querySelector('.todo-list')
    var strHtmls = ''
     todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : '';
        strHtmls += `<div class="row"><li class="${className}" onclick="onToggleTodo(event,'${todo.id}')">
                <span class="direction-buttons">${addDirection(todo.id, todo)}</span>  <span class="red">${todo.txt}</span>
                <span>Created at: ${formatDate(todo.time)}</span>
                <span>Importance: ${todo.importance}</span>
                <button onclick="onDeleteTodo(event, '${todo.id}')"><img src="images/x.png"></button></button> 
                </li></div>`
    })

    elTodoList.innerHTML = strHtmls

    if (!getActiveCount()) elTodoList.innerHTML = strHtmls + 'No Active todos'
    else if (getActiveCount() === gTodos.length) elTodoList.innerHTML = strHtmls + 'No Done todos'
    else if (!gTodos.length) elTodoList.innerHTML = strHtmls + 'No todos'
    renderStats();
}

function renderStats() {
    document.querySelector('.total-count').innerText = getTotalCount();
    document.querySelector('.active-count').innerText = getActiveCount()
}

function onAddTodo() {
    var elMission = document.querySelector('.mission')
    var elImportance = document.querySelector('.importance')
    if (!elMission.value) return

    addTodo(elMission.value, elImportance.value);
    renderTodos();
    var elInput = document.querySelector('.mission')
    elInput.value = ''
}

function addDirection(id) {
    if (gFilterBy === 'All') {
        var todoIdx = gTodos.findIndex(function (todo) { return todo.id === id });
        if (todoIdx === 0) return `<button class="arrow-color" onclick="onMoveMission(event, '${id}')"><img src="images/down.png"></button>`
        else if (todoIdx === gTodos.length - 1) return `<button class="arrow-color" onclick="onMoveMission(event, '${id}')"><img src="images/up.png"></button>`
        else return `<button class="arrow-color" onclick="onMoveMission(event, '${id}')"><img src="images/up.png"></button>  <button class="arrow-color" onclick="onMoveMission(event, '${id}')"><img src="images/down.png"></button>`
    } else return ''
}

function onMoveMission(ev, todoId) {
    ev.stopPropagation();
    if (gFilterBy === 'All') {
        var faceArrow = ev.target.outerHTML
        moveMission(todoId, faceArrow);
        renderTodos();
    }
}

function onDeleteTodo(ev, todoId) {
    ev.stopPropagation();
    if (onConfirm()) {
        deleteTodo(todoId);
        renderTodos();
    }
}

function onToggleTodo(ev, todoId) {
    ev.stopPropagation();
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(txt) {
    setFilter(txt);
    renderTodos();
}

function onSetSort(value) {
    if (value === 'Text') sortByName()
    else if (value === 'Importance') sortByImportance()
    else sortByTime()
    renderTodos()
}


function onConfirm() {
    var isConfirm = confirm('Are you sure you want to delete?')
    return isConfirm
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');

    doTrans();
}
