'use strict'

const GAME_OVER_SOUND = new Audio('sound/game-over.wav');
const FULL_ROW = new Audio('sound/full-row.wav')
var countUpClickes = 0
var ROW = 30;
var COLUMN = 16;
const WALL = 'WALL'
const FLOOR = 'FLOOR'
var O_BLOCK = [{ i: 0, j: 7 }, { i: 0, j: 8 }, { i: 1, j: 7 }, { i: 1, j: 8 }]
var L_BLOCK = [{ i: 0, j: 8 }, { i: 1, j: 6 }, { i: 1, j: 7 }, { i: 1, j: 8 }]
var J_BLOCK = [{ i: 0, j: 6 }, { i: 0, j: 7 }, { i: 0, j: 8 }, { i: 1, j: 6 }]
var S_BLOCK = [{ i: 0, j: 7 }, { i: 0, j: 8 }, { i: 1, j: 7 }, { i: 1, j: 6 }]
var Z_BLOCK = [{ i: 0, j: 6 }, { i: 0, j: 7 }, { i: 1, j: 7 }, { i: 1, j: 8 }]
var T_BLOCK = [{ i: 1, j: 6 }, { i: 1, j: 7 }, { i: 1, j: 8 }, { i: 0, j: 7 }]
var I_BLOCK = [{ i: 0, j: 6 }, { i: 0, j: 7 }, { i: 0, j: 8 }, { i: 0, j: 9 }]

var SHAPES_STOCK = [O_BLOCK, L_BLOCK, J_BLOCK, S_BLOCK, Z_BLOCK, T_BLOCK, I_BLOCK]
const SHAPE_NAME = ['O', 'L', 'J', 'S', 'Z', 'T', 'I']
var gCurrShape;
var gNextShape;
var gEmptyBoard;
var gBoard;
var gGame;
var gStopShape;
var gStopSpeed
var isDroped = false
var gFirstShape;

function initGame() {

    console.log('GAME READY')
    gEmptyBoard = true
    gFirstShape = true
    gGame = { gameOn: true, fullRow: 0, paused: false, instructionsIsShown: false }
    var elinst = document.querySelector('.instructions')
    elinst .classList.add('hide')
    var elModal = document.querySelector('.modal')
    elModal.classList.add('hide')
    gBoard = createBoard()
    renderBoard(gBoard)
    startTime()
    document.querySelector(`.time`).innerHTML = `TIME:  00:00`;
    document.querySelector(`.score`).innerHTML = `SCORE: 0`;
    createTetriminos()
    gNextShape = creatNextTetriminos()
}

function createTetriminos() {
    if (gFirstShape) {
        var idx = getRandomIntInclusive(0, 6)
        gCurrShape = [SHAPES_STOCK[idx], getRandomColor(), SHAPE_NAME[idx]]
        gFirstShape = false
    } else {
        gCurrShape = gNextShape
        gNextShape = creatNextTetriminos()
    }
    clearInterval(gStopSpeed)
    gStopShape = setInterval(moveTetriminos, 500)
    isDroped = false
}

function creatNextTetriminos() {
    if (gEmptyBoard) {
        gEmptyBoard = false
        var idx = getRandomIntInclusive(0, 6)
        gNextShape = [SHAPES_STOCK[idx], getRandomColor(), SHAPE_NAME[idx]]
        var location = gNextShape[0]
        var value = gNextShape[1]
        nextShapeTable()
        for (let i = 0; i < location.length; i++) {
            var cellSelector = `.N${getClassName(location[i])}`
            var elCell = document.querySelector(cellSelector);
            elCell.style.backgroundColor = value
        }
        return gNextShape
    }
}

function moveTetriminos() {
    var nextCoords;
    var currShapeCoords = gCurrShape[0]
    nextCoords = [{ i: currShapeCoords[0].i + 1, j: currShapeCoords[0].j },
    { i: currShapeCoords[1].i + 1, j: currShapeCoords[1].j },
    { i: currShapeCoords[2].i + 1, j: currShapeCoords[2].j },
    { i: currShapeCoords[3].i + 1, j: currShapeCoords[3].j }]

    for (var i = 0; i < nextCoords.length; i++) {
        var nextCoordI = nextCoords[i].i
        var nextCoordj = nextCoords[i].j
        var nextCoord = gBoard[nextCoordI][nextCoordj]

        if (nextCoord.type === WALL || nextCoord.stoped) {
            for (let j = 0; j < currShapeCoords.length; j++) {
                gBoard[currShapeCoords[j].i][currShapeCoords[j].j].stoped = true
                countUpClickes = 0
            }
            clearInterval(gStopShape)

            gCurrShape[0] = gNextShape[0]
            createTetriminos()

            if (isGameOver(currShapeCoords)) gameOver()
            checkFullRow()
            return
        }
    }
    gEmptyBoard = true
    emptyCells(currShapeCoords)
    fillCells(nextCoords, gCurrShape[1])
    gCurrShape[0] = nextCoords

}

function moveAllRowDown(row) {
    clearFullRow(row)
    for (var i = (row - 1); i > 0; i--) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cellColor = gBoard[i][j].color
            if (gBoard[i][j].stoped) {
                emptyCells([{ i: i, j: j }], 'full')
                fillCells([{ i: i + 1, j: j }], cellColor)
                gBoard[i + 1][j].stoped = true
            }
        }
    }
}

function checkFullRow() {
    var countEmptyRow;
    var countFullCell
    for (let i = ROW - 1; i > 0; i--) {
        countEmptyRow = 0
        countFullCell = 0
        for (let j = 0; j < COLUMN; j++) {
            if (gBoard[i][j].stoped) {
                countFullCell++
            }
        }
        if (!countFullCell) {
            countEmptyRow++
            if (countEmptyRow === 2) {
                break;
            }
        }
        else if (countFullCell === 14) {
            gGame.fullRow += 100
            FULL_ROW.play()
            var elScore = document.querySelector('.score');
            elScore.innerHTML = `SCORE: ${gGame.fullRow}`;
            moveAllRowDown(i)
            i = 29
        }
    }
}


function clearFullRow(row) {
    for (let j = 0; j < COLUMN; j++) {
        gBoard[row][j].isMarked = false
        gBoard[row][j].stoped = false
        gBoard[row][j].color = `rgb(233, 229, 229)`

        renderCell({ i: row, j: j }, `rgb(233, 229, 229)`, `full`)
    }
}

function fillCells(coords, cellColor) {
    for (var i = 0; i < coords.length; i++) {
        var locI = coords[i].i
        var locJ = coords[i].j
        var coord = { i: locI, j: locJ }
        gBoard[locI][locJ].isMarked = true
        gBoard[locI][locJ].color = cellColor
        renderCell(coord, cellColor)
    }
}

function emptyCells(shapePrevCoords) {
    for (var i = 0; i < shapePrevCoords.length; i++) {
        var locI = shapePrevCoords[i].i
        var locJ = shapePrevCoords[i].j
        var shapePose = { i: locI, j: locJ }
        gBoard[locI][locJ].isMarked = false
        gBoard[locI][locJ].stoped = false
        gBoard[locI][locJ].color = `rgb(233, 229, 229)`
        
        renderCell(shapePose, `rgb(233, 229, 229)`)
    }
}


function renderCell(location, value, full) {
    if (gBoard[location.i][location.j].type === WALL) value = `wall`
    var cellSelector = `.${getClassName(location)}`
    var elCell = document.querySelector(cellSelector);
    if(value !== `rgb(233, 229, 229)` && value !== 'wall'){
        
        elCell.classList.add('full-cell')
    } else { elCell.classList.remove('full-cell')}
    if(full === `full`) elCell.classList.add('disappear')
        else elCell.classList.remove('disappear')

    elCell.style.backgroundColor = value
    
}

function isGameOver(currShapeCoords) {
    for (let i = 0; i < currShapeCoords.length; i++) {
        if (gBoard[currShapeCoords[i].i][currShapeCoords[i].j].type === WALL && gBoard[currShapeCoords[i].i][currShapeCoords[i].j].stoped) {
            return true
        }
    }
}

function gameOver() {
    gGame.gameOn = false
    GAME_OVER_SOUND.play()
    saveBestScore()
   stopTime()
   localStorage.setItem('TIME', time)
    openModal()
    clearInterval(gStopShape)
    console.log('game over')
}


function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function openModal() {
    var elModal = document.querySelector('.modal')
    elModal.classList.remove('hide')
    elModal.innerHTML = `<h1>GAME OVER!!</h1><br><button class="play" onclick="initGame()">PLAY AGAIN</button>`
}



function pause() {
    var pause = document.querySelector('.pause')
    if(!gGame.gameOn || gGame.instructionsIsShown) return
    if (!gGame.paused) {
        gGame.paused = true
        clearInterval(gStopShape)
        clearTimeout(clearTime);
        pause.innerHTML = 'RESUME'

    } else {
        gGame.paused = false
        clearTime = setTimeout(startWatch, 1000);
        gStopShape = setInterval(moveTetriminos, 500)
        pause.innerHTML = 'PAUSE'
    }
}