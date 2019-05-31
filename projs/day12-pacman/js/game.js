'use strict';

const POWER_FOOD = '<img class="power-food" src="images/power-food.png">'
const WALL = '<img class="bricks" src="images/bricks.jpg">'
const FOOD = '<img class="food" src="images/food.png">'
const CHERRY = '<img class="cherry" src="images/cherry.png">'
const EMPTY = ' ';
var gCountfood;
var gCountCalories;
var gBoard;
var gGame;
var gSaveElement;
var gStopCherry;

function init() {
  gGame = {
    score: 0,
    isOn: true,
    invisibleGhost: false
  };
  gGhostImg = [0,1,2]
  gCountfood = 0
  gCountCalories = 0
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  addSuperFood()
  var elModal = document.querySelector('.modal')
  elModal.classList.add('hide')
}
function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      gCountfood++


      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {
        gCountfood--
        board[i][j] = WALL;
      }

      if (i === 1 && j === 1 || i === 8 && j === 8 ||
        i === 1 && j === 8 || i === 8 && j === 1) {
        gCountfood--
        board[i][j] = POWER_FOOD
      }
    }
  }


  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;
}


function addSuperFood() {
  gStopCherry = setInterval(() => {
    var cherryLoc = getRandomLoc()
    if (gBoard[cherryLoc.i][cherryLoc.j] === FOOD) {
      gSaveElement = FOOD
    } else gSaveElement = EMPTY
    gBoard[cherryLoc.i][cherryLoc.j] = CHERRY
    renderCell(cherryLoc, CHERRY)
    
    setTimeout(()=>{
      gBoard[cherryLoc.i][cherryLoc.j] = gSaveElement
      renderCell(cherryLoc, gSaveElement)
    }, 3000)
  }, 5000);
}


function gameEnd() {

  clearInterval(gIntervalGhosts);
  clearInterval(gStopCherry);
  gGame.isOn = false;
  gIntervalGhosts = null;
  var elModal = document.querySelector('.modal')
  elModal.classList.remove('hide')
}

function gameOver() {
  console.log('over');
  gameEnd()

  var elH1 = document.querySelector('.modal h1')
  elH1.innerHTML = 'GAME-OVER!'
}

function playerWon() {
  gameEnd()

  var elH1 = document.querySelector('.modal h1')
  elH1.innerHTML = 'YOU WON!'
}

