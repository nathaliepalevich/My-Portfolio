'use strict'

const MINE = `💣`
const SMILEY = '<img src="images/smi.png">'
const ANGRY = '<img src="images/angry.png">'
const WIN = '<img src="images/win.png">'
const SCARED = '<img src="images/scared.png">'
const FLAG_ICONE = '🚩'
const NOT_MINE = `❌`
const WIN_SOUND = new Audio('sound/win.wav')
const CLUE_SOUND = new Audio('sound/clue.wav')

var MINES_NUM;
var STOCK_ARR;
var gLevel = 0;
var gBoard;
var gFirstClick;
var gGame;
var LEVELS = [
    { SIZE: 4, MINES: 2, BEST_TIME: localStorage.getItem('beginner'), LEVEL: 'beginner' },
    { SIZE: 8, MINES: 12, BEST_TIME: localStorage.getItem('medium'), LEVEL: 'medium' },
    { SIZE: 12, MINES: 30, BEST_TIME: localStorage.getItem('expert'), LEVEL: 'expert' }
]


function level(el) {

    if (el.innerText === 'beginner') gLevel = 0
    else if (el.innerText === 'medium') gLevel = 1
    else gLevel = 2

    return initGame()
}

function initGame() {
    resetGame()
    gBoard = buildBoard(LEVELS[gLevel].SIZE)
    renderBoard()
    for (var i = 0; i < LEVELS.length; i++) {
        if (localStorage.getItem(LEVELS[i].LEVEL) === null) {
            document.querySelector(`.${LEVELS[i].LEVEL}`).innerHTML = `best time: 00:00`;
        } else document.querySelector(`.${LEVELS[i].LEVEL}`).innerHTML = `best time: ${localStorage.getItem(LEVELS[i].LEVEL)}`;
    }
}


function resetGame() {
    stopTime()
    STOCK_ARR = []
    gFirstClick = true;
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    LEVELS[0].MINES = 4
    LEVELS[1].MINES = 8
    LEVELS[2].MINES = 12

    MINES_NUM = LEVELS[gLevel].MINES
    document.querySelector('.mood').innerHTML = SMILEY

    document.querySelector(`.time`).innerHTML = `00:00`;

    var clueImg = document.querySelectorAll('.clue-box img')
    for (var i = 0; i < clueImg.length; i++) {
        // if (clueImg[i].classList.contains('red')) {
        // clueImg[i].classList.remove('red')
        // clueImg[i].classList.remove('clue')
        clueImg[i].style.display = 'inline-block';

    }
}

function buildBoard(size) {
    var board = []

    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    }
    return board
}

function renderBoard() {
    var strHTML = `<table border="2">`
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>`
        for (var j = 0; j < gBoard[0].length; j++) {
            strHTML += `<td onmouseup="cellClicked(this, ${i}, ${j}, event)" onmousedown="faceback(this)" class="cell-${i}-${j}"></td>`
        }
        strHTML += `</tr>`
    }
    strHTML += `</table>`
    document.querySelector('.main-board').innerHTML = strHTML
    document.querySelector('.mine').innerHTML = LEVELS[gLevel].MINES
}

function faceback(el) {
    if (!gGame.isOn && !gFirstClick || el.classList.contains('clicked') ||  el.innerHTML === FLAG_ICONE) return
    var mood = document.querySelector('.mood')
    mood.innerHTML = `${SCARED}`
}

function cellClicked(elCell, cellI, cellJ, event) {
    
    var clickedCell = { i: cellI, j: cellJ }
    
    if (!gGame.isOn && !gFirstClick || gBoard[cellI][cellJ].isShown || (event.button !== 2 && gBoard[cellI][cellJ].isMarked) || elCell.classList.contains('yellow')) return
    
    var mood = document.querySelector('.mood')
    mood.innerHTML = `${SMILEY}`
    
    var clueImg = document.querySelectorAll('.clue-box img')

    for (var i = 0; i < clueImg.length; i++) {
        if (clueImg[i].classList.contains('clue')) {
            quickPeek(cellI, cellJ)
            clueImg[i].classList.remove('clue')
            // clueImg[i].classList.add('red')
            clueImg[i].style.display = 'none';

            return
        }
    }

    if (event.button === 2) rightClick(cellI, cellJ)
    else {
        isFirstClick(cellI, cellJ)

        if (gBoard[cellI][cellJ].isMine) {
            gameOver(elCell, cellI, cellJ)
            return
        }

        if (gBoard[cellI][cellJ].minesAroundCount > 0) {
            elCell.innerHTML = gBoard[cellI][cellJ].minesAroundCount
            elCell.classList.add(`_${gBoard[cellI][cellJ].minesAroundCount}`)
            elCell.classList.add(`clicked`)
            gBoard[cellI][cellJ].isShown = true
            gGame.shownCount += 1
            checkWin()
        } else {
            expandShown(clickedCell)
            for (var i = 0; i < STOCK_ARR.length; i++) {
                expandShown(STOCK_ARR[i])
            }
        }
    }
}

function isFirstClick(cellI, cellJ){
    if (gFirstClick) {
        gFirstClick = false
        gGame.isOn = true
        startTime()
        for (var i = 0; i < LEVELS[gLevel].MINES; i++) {
            setMines(cellI, cellJ)
        }
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[i].length; j++) {
                if (!gBoard[i][j].isMine) {
                    setMinesNegsCount(i, j)
                }

            }
        }
    }
}

window.oncontextmenu = (e) => {
    e.preventDefault();
}

function rightClick(cellI, cellJ) {

    if (gBoard[cellI][cellJ].isShown || gFirstClick) return
 
    var mine = document.querySelector('.mine')
    var cell = document.querySelector(`.cell-${cellI}-${cellJ}`)

    if (!(gBoard[cellI][cellJ].isMarked)) {
        LEVELS[gLevel].MINES -= 1
        cell.innerHTML = `${FLAG_ICONE}`
        mine.innerHTML = `${LEVELS[gLevel].MINES}`
        gBoard[cellI][cellJ].isMarked = true
    }
    else {
        LEVELS[gLevel].MINES += 1
        cell.innerHTML = ``
        mine.innerHTML = `${LEVELS[gLevel].MINES}`
        gBoard[cellI][cellJ].isMarked = false
    }

    if (!LEVELS[gLevel].MINES) checkWin()
}


function gameOver(elCell, cellI, cellJ) {
    stopTime()
    elCell.innerHTML = MINE
    elCell.style.backgroundColor = 'red'
    gBoard[cellI][cellJ].isShown = true
    gGame.isOn = false

    var mood = document.querySelector('.mood')
    mood.innerHTML = `${ANGRY}`

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var cell = document.querySelector(`.cell-${i}-${j}`)
            if (gBoard[i][j].isMine) {
                if (gBoard[i][j].isMarked) continue;
                cell.innerHTML = MINE
                cell.classList.add('clicked')
            }
            else if (gBoard[i][j].isMarked && !gBoard[i][j].isMine) {
                cell.innerHTML = NOT_MINE
                cell.classList.add('clicked')
            }

        }
    }
}

function checkWin() {

    var cellsWithoutMine = LEVELS[gLevel].SIZE ** 2 - MINES_NUM
    
    if (gGame.shownCount === cellsWithoutMine && !LEVELS[gLevel].MINES) {
        var mood = document.querySelector('.mood')
        mood.innerHTML = `${WIN}`
        gGame.isOn = false
        WIN_SOUND.play()

        stopTime()
        bestTime()

    }
}

function bestTime() {

    if (localStorage.getItem(LEVELS[gLevel].LEVEL) === null) {
        localStorage.setItem(LEVELS[gLevel].LEVEL, bestTime2)
        localStorage.setItem(`${LEVELS[gLevel].LEVEL} in sec`, gGame.secsPassed)
    } else if (gGame.secsPassed < localStorage.getItem(`${LEVELS[gLevel].LEVEL} in sec`)) {
        localStorage.setItem(LEVELS[gLevel].LEVEL, bestTime2)
        localStorage.setItem(`${LEVELS[gLevel].LEVEL} in sec`, gGame.secsPassed)
    }
    document.querySelector(`.${LEVELS[gLevel].LEVEL}`).innerHTML = `best time: ${localStorage.getItem(LEVELS[gLevel].LEVEL)}`;
}


function clue(el) {
    // if (el.classList.contains('red')) return
    CLUE_SOUND.play()

    el.classList.toggle('clue')
}