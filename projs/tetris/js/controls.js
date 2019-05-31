function moveRight() {
    if(gGame.paused || gGame.instructionsIsShown) return
    var nextCoords = []
    var shapePrevCoords = []

    for (var i = 0; i < gCurrShape[0].length; i++) {
        shapePrevCoords.push(gCurrShape[0][i])
        var nextCoord = { i: gCurrShape[0][i].i, j: gCurrShape[0][i].j + 1 }
        if (gBoard[nextCoord.i][nextCoord.j].type === WALL || gBoard[nextCoord.i][nextCoord.j].stoped) return
        nextCoords.push(nextCoord)
    }

    if (nextCoords.length === 4) {
        emptyCells(shapePrevCoords)
        gCurrShape[0] = nextCoords
        fillCells(gCurrShape[0], gCurrShape[1])
    }
}

function moveLeft() {
    if(gGame.paused || gGame.instructionsIsShown) return
    var nextCoords = []
    var shapePrevCoords = []
    for (var i = 0; i < gCurrShape[0].length; i++) {
        shapePrevCoords.push(gCurrShape[0][i])
        var nextCoord = { i: gCurrShape[0][i].i, j: gCurrShape[0][i].j - 1 }
        if (gBoard[nextCoord.i][nextCoord.j].type === WALL || gBoard[nextCoord.i][nextCoord.j].stoped) return
        nextCoords.push(nextCoord)
    }

    if (nextCoords.length === 4) {
        emptyCells(shapePrevCoords)
        gCurrShape[0] = nextCoords
        fillCells(gCurrShape[0], gCurrShape[1])
    }
}

// function drop() {
//     if (isDroped || gGame.paused) return
//     gStopSpeed = setInterval(moveTetriminos, 1)
//     isDroped = true
// }

function drop() {
    if (gGame.paused || gGame.instructionsIsShown) return
    gStopSpeed = setTimeout(moveTetriminos, 2)
}

function handleKey(event) {
    if(gGame.paused || gGame.instructionsIsShown) return
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft()
            break;
        case 'ArrowRight':
            moveRight()
            break;
        case 'ArrowDown':
            drop()
            break;

        case 'ArrowUp':
            rotate()
            break;
    }
}

function rotate() {
    var currShapeCoord = gCurrShape[0]
if(gCurrShape)
    switch (gCurrShape[2]) {
        case 'L':
            countUpClickes++
            var nextCoords = rotateL(countUpClickes)
            break;
        case 'J':
            countUpClickes++
            var nextCoords = rotateJ(countUpClickes)
            break;
        case 'S':
            countUpClickes++
            var nextCoords = rotateS(countUpClickes)
            break;
        case 'Z':
            countUpClickes++
            var nextCoords = rotateZ(countUpClickes)
            break;
        case 'T':
            countUpClickes++
            var nextCoords = rotateT(countUpClickes)
            break;
        case 'I':
            countUpClickes++
            var nextCoords = rotateI(countUpClickes)
            break;
            default:
            console.log('O')
            return;
    }
    if (countUpClickes === 4) countUpClickes = 0
    for (var i = 0; i < gCurrShape[0].length; i++) {
        if (gBoard[nextCoords[i].i][nextCoords[i].j].type === WALL || gBoard[nextCoords[i].i][nextCoords[i].j].stoped) {
            countUpClickes = 0
            return
        }
    }

    if (nextCoords.length === 4) {
        emptyCells(currShapeCoord)
        gCurrShape[0] = nextCoords
        fillCells(gCurrShape[0], gCurrShape[1])
    }

}
