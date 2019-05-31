'use strict'

var gProjs;

function createProj(id, name, title, desc, url, publishedAt,labels ) {
    return {
        id,
        name,
        title,
        desc,
        url,
        publishedAt,
        labels,
    }
}

function createProjects() {
    gProjs = [
        createProj('tetris', 'Tetris', 'Complete this rows', 'lorem ipsum lorem ipsum lorem ipsum','img/portfolio/tetris.png' ,  1448693940000, ['Matrixes', 'keyboard events']),
        createProj('mine-sweeper', 'Mine-Sweeper', `Don't step on mines`, 'lorem ipsum lorem ipsum lorem ipsum', 'img/portfolio/mine-sweeper.png'   ,  1448693940000, ['Matrixes', 'keyboard events']),
        createProj('sokoban', 'Sokoban', 'Better push those boxes', 'lorem ipsum lorem ipsum lorem ipsum','img/portfolio/sokoban.png'  ,  1448693940000, ['Matrixes', 'keyboard events']),
        createProj('day12-pacman', 'pacman', 'Watch out from ghosts', 'lorem ipsum lorem ipsum lorem ipsum','img/portfolio/pacman.png'  ,  1448693940000, ['Matrixes', 'keyboard events']),
        createProj('chess-start-here', 'chess', 'Watch out from ghosts', 'lorem ipsum lorem ipsum lorem ipsum','img/portfolio/chess.png'  ,  1448693940000, ['Matrixes', 'keyboard events'])
    ]
}
function getProjs(){
    return gProjs
}