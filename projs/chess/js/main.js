'use strict'

// Pieces Types
const KING_WHITE = '<img src="images/King-white.ico">';
const QUEEN_WHITE = '<img src="images/Queen-white.ico">';
const ROOK_WHITE = '<img src="images/Rook-white.ico">';
const BISHOP_WHITE = '<img src="images/Bishop-white.ico">';
const KNIGHT_WHITE = '<img src="images/Knight-white.ico">';
const PAWN_WHITE = '<img src="images/Pawn-white.ico">';
const KING_BLACK = '<img src="images/King-black.ico">';
const QUEEN_BLACK = '<img src="images/Queen-black.ico">';
const ROOK_BLACK = '<img src="images/Rook-black.ico">';
const BISHOP_BLACK = '<img src="images/Bishop-black.png">';
const KNIGHT_BLACK = '<img src="images/Knight-black.ico">';
const PAWN_BLACK = '<img src="images/Pawn-black.ico">';

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            var piece = ''
            if (i === 1) piece = PAWN_BLACK;
            if (i === 6) piece = PAWN_WHITE;
            board[i][j] = piece;
        }
    }

    board[0][0] = board[0][7] = ROOK_BLACK;
    board[0][1] = board[0][6] = KNIGHT_BLACK;
    board[0][2] = board[0][5] = BISHOP_BLACK;
    board[0][3] = QUEEN_BLACK;
    board[0][4] = KING_BLACK;

    board[7][0] = board[7][7] = ROOK_WHITE;
    board[7][1] = board[7][6] = KNIGHT_WHITE;
    board[7][2] = board[7][5] = BISHOP_WHITE;
    board[7][3] = QUEEN_WHITE;
    board[7][4] = KING_WHITE;


    // build the board 8 * 8
    console.table(board);
    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            //  figure class name
            var className = ((i + j) % 2 === 0) ? 'white' : 'black';
            var tdId = `cell-${i}-${j}`;

            strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this)">
                            ${cell}
                        </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {

    // if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        movePiece(gSelectedElCell, elCell);
        cleanBoard();
        return;
    }


    cleanBoard();

    elCell.classList.add('selected');
    gSelectedElCell = elCell;

    var cellCoord = getCellCoord(elCell.id);
    var piece = gBoard[cellCoord.i][cellCoord.j];

    var possibleCoords = [];
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
            break;
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord)
            break;
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsQueen(cellCoord)
    }
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {

    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);

    // update the MODEl
    var piece = gBoard[fromCoord.i][fromCoord.j];
    gBoard[fromCoord.i][fromCoord.j] = '';
    gBoard[toCoord.i][toCoord.j] = piece;
    // update the DOM
    elFromCell.innerText = '';
    elToCell.innerHTML = piece;

}

function markCells(coords) {

    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`);
        elCell.classList.add('mark')
    }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var parts = strCellId.split('-')
    var coord = { i: +parts[1], j: +parts[2] };
    return coord;
}

function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected');
    }
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}


function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];

    var diff = (isWhite) ? -1 : 1;
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
    if (isEmptyCell(nextCoord)) res.push(nextCoord);
    else return res;

    if ((pieceCoord.i === 1 && !isWhite) || (pieceCoord.i === 6 && isWhite)) {
        diff *= 2;
        nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
        if (isEmptyCell(nextCoord)) res.push(nextCoord);
    }
    return res;
}



function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];
    res = checkRow(res, pieceCoord)
    res = checkCol(res, pieceCoord)
    return res;
}

// Check Diagonals - the Bishop 
function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    res = diagonalOne(res, pieceCoord)
    res = diagonalTwo(res, pieceCoord)
    res = diagonalThree(res, pieceCoord)
    res = diagonalFour(res, pieceCoord)
    return res;
}

function getAllPossibleCoordsKing(pieceCoord) {
    var res = []
    for (var i = pieceCoord.i - 1; i <= pieceCoord.i + 1; i++) {
        for (var j = pieceCoord.j - 1; j <= pieceCoord.j + 1; j++) {
            if (i === pieceCoord.i && j === pieceCoord.j) continue;
            if (i < 0 || i >= gBoard.length) continue;
            if (j < 0 || j >= gBoard[0].length) continue;
            var coord = { i: i, j: j };
            if (gBoard[i][j] === '') res.push(coord);
        }
    }
    return res;
}

function getAllPossibleCoordsQueen(pieceCoord) {
    var res = []

    res = checkCol(res, pieceCoord)
    res = checkRow(res, pieceCoord)
    res = diagonalOne(res, pieceCoord)
    res = diagonalTwo(res, pieceCoord)
    res = diagonalThree(res, pieceCoord)
    res = diagonalFour(res, pieceCoord)
    return res
}


function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];

    //    var big = 1
    // for (let row = pieceCoord.i -2; row < pieceCoord.i +2; row++) {
    //     for (let col = pieceCoord.j - 1; col < pieceCoord.j +1; col++) {


    //     }
    //    if(row === pieceCoord.i -2){
    //     var coord = { i: row, j: col };
    //     if (isEmptyCell(coord)) res.push(coord);
    //    }

    // }
// debugger
if (pieceCoord.i - 2 >= 0 && pieceCoord.j - 1 >= 0) {
    var coord = { i: pieceCoord.i - 2, j: pieceCoord.j - 1 }
        if (isEmptyCell(coord)) res.push(coord)
    }
    if (pieceCoord.i - 2 >= 0 && pieceCoord.j + 1 <= 7) {
    var coord = { i: pieceCoord.i - 2, j: pieceCoord.j + 1 }
        if (isEmptyCell(coord)) res.push(coord)
    }
    if (pieceCoord.i - 1 >= 0 && pieceCoord.j + 2 <= 7) {
    var coord = { i: pieceCoord.i - 1, j: pieceCoord.j + 2 }
        if (isEmptyCell(coord)) res.push(coord)
    }
    if (pieceCoord.i + 1 <= 7 && pieceCoord.j + 2 <= 7) {
    var coord = { i: pieceCoord.i + 1, j: pieceCoord.j + 2 }
        if (isEmptyCell(coord)) res.push(coord)
    }
    if (pieceCoord.i + 2 <= 7 && pieceCoord.j + 1 <= 7) {
    var coord = { i: pieceCoord.i + 2, j: pieceCoord.j + 1 }
        if (isEmptyCell(coord)) res.push(coord)
    }
    if (pieceCoord.i + 2 <= 7 && pieceCoord.j - 1 >= 0) {
    var coord = { i: pieceCoord.i + 2, j: pieceCoord.j - 1 }
        if (isEmptyCell(coord)) res.push(coord)
    }
    if (pieceCoord.i + 1 <= 7 && pieceCoord.j - 2 >= 0) {
    var coord = { i: pieceCoord.i + 1, j: pieceCoord.j - 2 }
        if (isEmptyCell(coord)) res.push(coord)
    }
    if (pieceCoord.i - 1 >= 0 && pieceCoord.j - 2 >= 0) {
    var coord = { i: pieceCoord.i - 1, j: pieceCoord.j - 2 }
        if (isEmptyCell(coord)) res.push(coord)
    }
    return res;
}
function diagonalOne(res, pieceCoord) {
    var i = pieceCoord.i + 1
    for (var idx = pieceCoord.j + 1; i < gBoard.length && idx < gBoard.length; idx++) {
        var coord = { i: i++, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    return res
}

function diagonalTwo(res, pieceCoord) {
    var i = pieceCoord.i - 1;
    for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
        var coord = { i: i--, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    return res
}

function diagonalThree(res, pieceCoord) {
    var i = pieceCoord.i - 1
    for (var idx = pieceCoord.j - 1; i > 0 && idx < gBoard.length; idx--) {
        var coord = { i: i--, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    return res
}

function diagonalFour(res, pieceCoord) {
    var i = pieceCoord.i + 1;
    for (var idx = pieceCoord.j - 1; i < gBoard.length && idx >= 0; idx--) {
        var coord = { i: i++, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    return res
}

function checkCol(res, pieceCoord) {
    var col = pieceCoord.j
    for (let row = pieceCoord.i - 1; row >= 0; row--) {
        var coord = { i: row, j: col };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    for (let row = pieceCoord.i + 1; row < gBoard.length; row++) {
        var coord = { i: row, j: col };
        if (!isEmptyCell(coord)) break;
        res.push(coord);

    }
    return res
}

function checkRow(res, pieceCoord) {
    var row = pieceCoord.i

    for (let col = pieceCoord.j - 1; col >= 0; col--) {
        var coord = { i: row, j: col };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    for (let col = pieceCoord.j + 1; col < gBoard.length; col++) {
        var coord = { i: row, j: col };
        if (!isEmptyCell(coord)) break;
        res.push(coord);

    }

    return res
    // var cellsToMark = []


    // for (let col = 0; col < gBoard.length; col++) {
    //     var coord = { i: row, j: col };
    //     if (col === pieceCoord.j) {
    //         debugger
    //         res = cellsToMark.slice()
    //         cellsToMark = []
    //         console.log(res);
    //     }
    //     else if (isEmptyCell(coord))  {
    //         cellsToMark.push(coord)
    //     } else if (gBoard[row][col] !== '' && col !== pieceCoord.j) {
    //         cellsToMark = []
    //     } 

    // }

}