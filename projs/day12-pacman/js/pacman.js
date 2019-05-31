'use strict'
var gPacman;
var gDeadGhosts = []
var PACMAN = '<img  class="pacman" src="images/pacman-left.png">'

function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isPower: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;
  // console.log('eventKeyboard:', eventKeyboard);

  var nextLocation = getNextLocation(eventKeyboard);
  // User pressed none-relevant key in the keyboard
  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];

  // Hitting a WALL, not moving anywhere
  if (nextCell === WALL) return;

  // Hitting FOOD? update score
  if (nextCell === FOOD) {
    gCountCalories++
    updateScore(1);
    if (gCountCalories === 56) {
      playerWon()
    }
  }
  if (nextCell === CHERRY) {
  //  debugger
    updateScore(10);
  }
  if (nextCell === POWER_FOOD) {
    // if ghost in regular mode => you can eat powerfood else yoe dont eat power food!
    invisibleGhost()
  }

  else if (nextCell === GHOST) {
    if (gPacman.isPower) {
      for (let i = 0; i < gGhosts.length; i++) {
        var ghostLoc = gGhosts[i].location
        if (nextLocation.i === ghostLoc.i &&
          nextLocation.j === ghostLoc.j) {
           if (gGhosts[i].currCellContent === FOOD) {
            updateScore(1);
            gGhosts[i].currCellContent = EMPTY
          }
          var ghost = gGhosts.splice(gGhosts[i], 1)
          gDeadGhosts.push(...ghost)
      }
    }
      // debugger
      renderCell(gPacman.location, EMPTY);
    } else {
      gameOver()
      renderCell(gPacman.location, EMPTY);
      return;
    }
  }

  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);

  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      PACMAN = '<img  class="pacman" src="images/pacman-up.png">'
      nextLocation.i--;
      break;
    case 'ArrowDown':
      PACMAN = '<img  class="pacman" src="images/pacman-down.png">'
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      PACMAN = '<img  class="pacman" src="images/pacman-left.png">'
      nextLocation.j--;
      break;
    case 'ArrowRight':
      PACMAN = '<img  class="pacman" src="images/pacman-right.png">'
      nextLocation.j++;
      break;
    default: return null;
  }

  return nextLocation;
}