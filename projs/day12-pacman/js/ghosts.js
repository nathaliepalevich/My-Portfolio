'use strict'
var GHOST =  `<img src="images/2.png" class="ghost">`;
var gGhostImg;
var gIntervalGhosts;
var gGhosts;


function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: `<img src="images/${gGhostImg.pop()}.png" class="ghost">`
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}


function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 3000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = { i: ghost.location.i + moveDiff.i, j: ghost.location.j + moveDiff.j }
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)

        // if WALL return
        if (gBoard[nextLocation.i][nextLocation.j] === WALL) return

        // if PACMAN - gameOver, return
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
            if (gPacman.isPower) {
                return
            }
            gameOver()
            return
        }
        // if GHOST - give up
        if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
            return
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)

        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, getGhostHTML(ghost))

    }
}
function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}



function recoverGhosts() {

    for (let i = 0; i < gDeadGhosts.length; i++) {
        // debugger
        var ghost = gDeadGhosts.splice(gDeadGhosts[i], 1)
        ghost[0].location.i = 3;
        ghost[0].location.j = 3;
        gGhosts.push(...ghost)
    }
}


function invisibleGhost() {
    // change the ghosts color for 5 sec
    // add to ghost object isInvisible = true / false
    // if true activate function harmlessGhosts()
    setTimeout(() => {
        gGame.invisibleGhost = false;
        gPacman.isPower = false;
        setTimeout(recoverGhosts, 2000);
    }, 5000);
    gGame.invisibleGhost = true
    gPacman.isPower = true

}

function getGhostHTML(ghost) {
    if (gGame.invisibleGhost) {
        return `<span><img src="images/3.png" class="ghost"></span>`
    }
    return `<span> ${ghost.color}</span>`
}






