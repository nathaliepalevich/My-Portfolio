function createBoard() {

    var board = new Array(ROW);
    for (var i = 0; i < board.length; i++) {
        board[i] = new Array(COLUMN);
    }
    // Put FLOOR everywhere and WALL at edges
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = { type: FLOOR, isMarked: false, stoped: false };
            // Place Walls at edges
            if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
                cell.type = WALL;
            }
            board[i][j] = cell;
        }
    }
    return board;
}

function renderBoard(board) {
    nextShapeTable()
    var elBoard = document.querySelector('.board')
    var strHTML = `<table class="main-board">`
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var cellClass = getClassName({ i: i, j: j })

            if (currCell.type === FLOOR) cellClass += ' floor';
            else if (currCell.type === WALL) cellClass += ' wall';

            strHTML += `<td class="cell ${cellClass}" ></td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</table>`
    elBoard.innerHTML = strHTML
}


function instructionsModal() {
    if (gGame.paused) return
    var elmodal = document.querySelector('.instructions')
    var strHTML = `
    <span style="color: yellow; bolder">Instructions Tetris Classic </span><br>
    <span style="color: red; ">Goal</span><br>
    You have to make full horizontal lines with the different shaped blocks that fall into the game area.<br>
    Full lines will then disappear and provide points. <br>
    
    Score calculation<br>
    1 line:	100 points<br>
    
    <span style="color: red;"><br>Controls</span>
    <br><span>Left arrow key:</span>	move block to the left
    <br> Right arrow key:	move block to the right
    <br>Down arrow key:	move block down
    <br>Up arrow key:	rotate block clockwise
    `
    if (gGame.gameOn) {
        if (!gGame.instructionsIsShown) {
            clearInterval(gStopShape)
            clearTimeout(clearTime);
        } else {
            clearTime = setTimeout(startWatch, 1000);
            gStopShape = setInterval(moveTetriminos, 500)
        }
    }
    gGame.instructionsIsShown = !gGame.instructionsIsShown
    elmodal.innerHTML = strHTML
    elmodal.classList.toggle('hide')
}

function nextShapeTable() {
    var elBoard = document.querySelector('.next-shape')
    var strHTML = `<table class="next">`
    for (var i = -1; i < 3; i++) {
        strHTML += `<tr>`
        for (var j = 5; j < 10; j++) {
            var cellClass = getClassName({ i: i, j: j })
            if (j === 4 || i === 2) strHTML += `<td class="cell N${cellClass}" border="2";></td>`
            else strHTML += `<td class="cell N${cellClass}" border="2";></td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</table>`
    elBoard.innerHTML = strHTML
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}