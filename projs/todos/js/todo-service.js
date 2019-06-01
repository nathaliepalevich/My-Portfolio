
var gTodos;
var gFilterBy = 'All';
var gImportance = 0
function createTodos() {

    var todos = loadFromStorage('todos')
    debugger
    
    if (!todos || !todos.length) {
        todos = [
            createTodo('Learn JS'),
            createTodo('Master CSS'),
            createTodo('Live good'),
        ]
    }
    gTodos = todos

    saveToStorage('todos', gTodos)
}

function createTodo(txt, importance) {
    return {
        id: makeId(),
        importance: (importance) ? +importance : 1,
        txt: txt,
        time: createdAt(),
        isDone: false
    }
}

function getTodosForDisplay() {
    if (gFilterBy === 'All') return gTodos;
    return gTodos.filter(function (todo) {
        return (todo.isDone && gFilterBy === 'Done') ||
            (!todo.isDone && gFilterBy === 'Active')
    })
}

function addTodo(txt, importance) {
    var todo = createTodo(txt, importance);
    gTodos.unshift(todo);
    saveToStorage('todos', gTodos)
}

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) { return todo.id === todoId });
    gTodos.splice(todoIdx, 1);
    saveToStorage('todos', gTodos)
}

function moveMission(todoId, faceArrow) {
    var direction = 0
    var todoIdx = gTodos.findIndex(function (todo) { return todo.id === todoId });

    if(faceArrow === '<img src="images/up.png">' && !(todoIdx===0)) direction -= 1
    else if(faceArrow === '<img src="images/down.png">' && !(todoIdx === gTodos.length-1)) direction += 1
    else return
    var holdTodo = gTodos.splice(todoIdx, 1);
    gTodos.splice(todoIdx + direction, 0, ...holdTodo);
    saveToStorage('todos', gTodos)
}


function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) { return todo.id === todoId });
    todo.isDone = !todo.isDone;
    saveToStorage('todos', gTodos)
}

function setFilter(txt) {
    gFilterBy = txt;
}

function getTotalCount() {
    return gTodos.length
}

function getActiveCount() {
    var activeTodos = gTodos.filter(function (todo) { return !todo.isDone })
    return activeTodos.length;
}

// function saveTodos() {
//     saveToStorage('todos', gTodos)
// }

function createdAt() {
    var time = Date.now()
    formatDate(time)
    return time

}

function formatDate(date) {
    var monthNames = [
        'January', 'February', 'March',
        'April', 'May', 'June', 'July',
        'August', 'September', 'October',
        'November', 'December'
    ];

    var houre = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return `${day}.${monthNames[monthIndex]}.${year} | ${houre}:${minutes}:${seconds}`;
}

function sortByName() {
    return gTodos.sort(function (obj1, obj2) {
        return (obj1.txt.toLowerCase() > obj2.txt.toLowerCase()) ? 1 : -1
    })

}

function sortByImportance() {
    return gTodos.sort(function (obj1, obj2) {
        return (obj1.importance > obj2.importance) ? 1 : -1
    })
}

function sortByTime() {
    gTodos.sort(function (obj1, obj2) {
        return (Date.parse(obj1.time) < Date.parse(obj2.time)) ? 1 : -1
    })
}
