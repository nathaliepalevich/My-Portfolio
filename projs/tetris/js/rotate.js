



// var L_BLOCK = [{ i: 0, j: 7 }, { i: 1, j: 5 }, { i: 1, j: 6 }, { i: 1, j: 7 }]
function rotateL(countUpClickes) {

    var currShapeCoord = gCurrShape[0]
    switch (countUpClickes) {
        case (1):
            return [
                { i: currShapeCoord[0].i + 1, j: currShapeCoord[0].j },
                { i: currShapeCoord[1].i - 2, j: currShapeCoord[1].j + 1 },
                { i: currShapeCoord[2].i, j: currShapeCoord[2].j },
                { i: currShapeCoord[3].i - 1, j: currShapeCoord[3].j - 1 }
            ]

        case (2):
            return [
                { i: currShapeCoord[0].i, j: currShapeCoord[0].j - 2 },
                { i: currShapeCoord[1].i + 1, j: currShapeCoord[1].j + 1 },
                { i: currShapeCoord[2].i - 1, j: currShapeCoord[2].j },
                { i: currShapeCoord[3].i, j: currShapeCoord[3].j - 1 },
            ]
        case (3):
            return [
                { i: currShapeCoord[0].i - 2, j: currShapeCoord[0].j + 1 },
                { i: currShapeCoord[1].i + 1, j: currShapeCoord[1].j },
                { i: currShapeCoord[2].i, j: currShapeCoord[2].j + 1 },
                { i: currShapeCoord[3].i - 1, j: currShapeCoord[3].j + 2 }
            ]
        case (4):

            return [
                { i: currShapeCoord[0].i, j: currShapeCoord[0].j + 1 },
                { i: currShapeCoord[1].i - 1, j: currShapeCoord[1].j - 2 },
                { i: currShapeCoord[2].i, j: currShapeCoord[2].j - 1 },
                { i: currShapeCoord[3].i + 1, j: currShapeCoord[3].j }
            ]

    }
}


function rotateJ(countUpClickes) {

    var currShapeCoord = gCurrShape[0]

    switch (countUpClickes) {
        case (1):
            return [
                { i: currShapeCoord[0].i, j: currShapeCoord[0].j +2 },
                { i: currShapeCoord[1].i+1 , j: currShapeCoord[1].j +1 },
                { i: currShapeCoord[2].i+2, j: currShapeCoord[2].j },
                { i: currShapeCoord[3].i - 1, j: currShapeCoord[3].j +1}
            ]

        case (2):
            return [
                { i: currShapeCoord[0].i + 1, j: currShapeCoord[0].j  },
                { i: currShapeCoord[1].i, j: currShapeCoord[1].j -1 },
                { i: currShapeCoord[2].i - 1, j: currShapeCoord[2].j -2},
                { i: currShapeCoord[3].i , j: currShapeCoord[3].j +1  },
            ]
        // here
        case (3):
            return [
                { i: currShapeCoord[0].i + 1, j: currShapeCoord[0].j - 2 },
                { i: currShapeCoord[1].i , j: currShapeCoord[1].j -1},
                { i: currShapeCoord[2].i - 1, j: currShapeCoord[2].j },
                { i: currShapeCoord[3].i +2 , j: currShapeCoord[3].j - 1 }
            ]
        case (4):

            return [
                { i: currShapeCoord[0].i -1, j: currShapeCoord[0].j  },
                { i: currShapeCoord[1].i , j: currShapeCoord[1].j +1},
                { i: currShapeCoord[2].i +1, j: currShapeCoord[2].j +2 },
                { i: currShapeCoord[3].i , j: currShapeCoord[3].j -1 }
            ]

    }
}

// var S_BLOCK = [{ i: 0, j: 5 }, { i: 0, j: 6 }, { i: 1, j: 5 }, { i: 1, j: 4 }]

function rotateS(countUpClickes) {

    var currShapeCoord = gCurrShape[0]

    switch (countUpClickes) {
        case (1):
        case (3):
            return [
                { i: currShapeCoord[0].i, j: currShapeCoord[0].j - 1 },
                { i: currShapeCoord[1].i - 1, j: currShapeCoord[1].j - 2 },
                { i: currShapeCoord[2].i - 1, j: currShapeCoord[2].j },
                { i: currShapeCoord[3].i, j: currShapeCoord[3].j + 1 }
            ]

        case (2):
        case (4):
            return [
                { i: currShapeCoord[0].i, j: currShapeCoord[0].j + 1 },
                { i: currShapeCoord[1].i + 1, j: currShapeCoord[1].j + 2 },
                { i: currShapeCoord[2].i + 1, j: currShapeCoord[2].j },
                { i: currShapeCoord[3].i, j: currShapeCoord[3].j - 1 },
            ]
    }
}

// var Z_BLOCK = [{ i: 0, j: 5 }, { i: 0, j: 6 }, { i: 1, j: 6 }, { i: 1, j: 7 }]

function rotateZ(countUpClickes) {

    var currShapeCoord = gCurrShape[0]

    switch (countUpClickes) {
        case (1):
        case (3):
            return [
                { i: currShapeCoord[0].i - 1, j: currShapeCoord[0].j + 2 },
                { i: currShapeCoord[1].i, j: currShapeCoord[1].j + 1 },
                { i: currShapeCoord[2].i - 1, j: currShapeCoord[2].j },
                { i: currShapeCoord[3].i, j: currShapeCoord[3].j - 1 },
            ]

        case (2):
        case (4):
            return [
                { i: currShapeCoord[0].i + 1, j: currShapeCoord[0].j - 2 },
                { i: currShapeCoord[1].i, j: currShapeCoord[1].j - 1 },
                { i: currShapeCoord[2].i + 1, j: currShapeCoord[2].j },
                { i: currShapeCoord[3].i, j: currShapeCoord[3].j + 1 }

            ]
    }
}


// var I_BLOCK = [{ i: 0, j: 5 }, { i: 0, j: 6 }, { i: 0, j: 7 }, { i: 0, j: 8 }] //6

function rotateI(countUpClickes) {

    var currShapeCoord = gCurrShape[0]

    switch (countUpClickes) {
        case (1):
        case (3):
            return [
                { i: currShapeCoord[0].i, j: currShapeCoord[0].j + 1 },
                { i: currShapeCoord[1].i + 1, j: currShapeCoord[1].j },
                { i: currShapeCoord[2].i + 2, j: currShapeCoord[2].j - 1 },
                { i: currShapeCoord[3].i + 3, j: currShapeCoord[3].j - 2 },
            ]

        case (2):
        case (4):
            return [
                { i: currShapeCoord[0].i, j: currShapeCoord[0].j - 1 },
                { i: currShapeCoord[1].i - 1, j: currShapeCoord[1].j },
                { i: currShapeCoord[2].i - 2, j: currShapeCoord[2].j + 1 },
                { i: currShapeCoord[3].i - 3, j: currShapeCoord[3].j + 2 }

            ]
    }
}

// var T_BLOCK = [{ i: 1, j: 5 }, , { i: 1, j: 6 }, { i: 1, j: 7 }, { i: 0, j: 6 }]
function rotateT(countUpClickes) {

    var currShapeCoord = gCurrShape[0]

    switch (countUpClickes) {
        case (1):
            return [
                { i: currShapeCoord[0].i-1, j: currShapeCoord[0].j + 1 },
                { i: currShapeCoord[1].i , j: currShapeCoord[1].j  },
                { i: currShapeCoord[2].i+1, j: currShapeCoord[2].j-1 },
                { i: currShapeCoord[3].i + 1, j: currShapeCoord[3].j + 1 }
            ]

        case (2):
            return [
                { i: currShapeCoord[0].i + 1, j: currShapeCoord[0].j +1},
                { i: currShapeCoord[1].i, j: currShapeCoord[1].j  },
                { i: currShapeCoord[2].i - 1, j: currShapeCoord[2].j -1 },
                { i: currShapeCoord[3].i +1, j: currShapeCoord[3].j -1 },
            ]
        case (3):
            return [
                { i: currShapeCoord[0].i + 2, j: currShapeCoord[0].j - 1 },
                { i: currShapeCoord[1].i + 1, j: currShapeCoord[1].j },
                { i: currShapeCoord[2].i , j: currShapeCoord[2].j + 1 },
                { i: currShapeCoord[3].i, j: currShapeCoord[3].j - 1 }
            ]
        case (4):

            return [
                { i: currShapeCoord[0].i , j: currShapeCoord[0].j -1 },
                { i: currShapeCoord[1].i+1, j: currShapeCoord[1].j  },
                { i: currShapeCoord[2].i + 2, j: currShapeCoord[2].j + 1 },
                { i: currShapeCoord[3].i , j: currShapeCoord[3].j+1 }
            ]

    }
}