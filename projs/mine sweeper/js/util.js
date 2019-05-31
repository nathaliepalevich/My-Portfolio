function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function setMines(I, J) {
    var cellI;
    var cellJ;

    do {
        cellI = getRandomIntInclusive(0, LEVELS[gLevel].SIZE - 1)
        cellJ = getRandomIntInclusive(0, LEVELS[gLevel].SIZE - 1)
    } while (cellI === I && cellJ === J || gBoard[cellI][cellJ].isMine === true)

    gBoard[cellI][cellJ].isMine = true

}

function setMinesNegsCount(cellI, cellJ) {
    var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            // if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMine) neighborsCount++;
        }
    }
    gBoard[cellI][cellJ].minesAroundCount = neighborsCount;
}

function quickPeek(cellI, cellJ) {
    var tempo = []
    isFirstClick(cellI, cellJ)

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            // if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isShown) continue;
            tempo.push({ i: i, j: j })
            var elCell = document.querySelector(`.cell-${i}-${j}`)
    
            if (gBoard[i][j].minesAroundCount > 0) {
                elCell.innerHTML = gBoard[i][j].minesAroundCount
                elCell.classList.add(`_${gBoard[i][j].minesAroundCount}`)
                elCell.classList.add('yellow')
            }
            else if (gBoard[i][j].isMine) {
                elCell.innerHTML = MINE
                elCell.classList.add('yellow')
            }
            else if (!gBoard[i][j].minesAroundCount) {
                // elCell.classList.add('clicked')
                elCell.classList.add('yellow')
            }
        }
    }
    setTimeout(() => {
        for (var i = 0; i < tempo.length; i++) {
            // debugger
            var elCell = document.querySelector(`.cell-${tempo[i].i}-${tempo[i].j}`)
            if(gBoard[tempo[i].i][tempo[i].j].isMarked){
                elCell.innerHTML = FLAG_ICONE
            } else elCell.innerHTML = ''
            elCell.classList.remove('yellow')

        }
    }, 4000);
}

function expandShown(gClickedCell) {

    var cellI = gClickedCell.i
    var cellJ = gClickedCell.j


    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (gBoard[i][j].isShown || gBoard[i][j].isMarked) continue;
            // if (gBoard[i][j].isMine) continue
            var cell = gBoard[i][j].minesAroundCount;

            if (!cell) {
                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.classList.add('clicked')

                if (!(i === cellI && j === cellJ)) //expandShown({i:i,j:j});
               if (!(i === cellI && j === cellJ)) STOCK_ARR.push({ i: i, j: j });

            } else {

                var elCell = document.querySelector(`.cell-${i}-${j}`)
                elCell.innerHTML = gBoard[i][j].minesAroundCount
                elCell.classList.add(`_${gBoard[i][j].minesAroundCount}`)
                elCell.classList.add(`clicked`)
            }

            gBoard[i][j].isShown = true
            gGame.shownCount += 1
            checkWin()
        }

    }
    return STOCK_ARR;
}

