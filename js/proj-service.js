'use strict'

var gProjs;

function createProj(id, name, title, desc, url, publishedAt,labels,link ) {
    return {
        id,
        name,
        title,
        desc,
        url,
        publishedAt,
        labels,
        link
    }
}

function createProjects() {
    gProjs = [
        createProj('tetris', 'Tetris', 'Complete this rows', '','img/portfolio/tetris.png' ,  '1/5/2019', ['Matrixes', 'keyboard events'], 'https://nathaliepalevich.github.io/My-Portfolio/projs/tetris/index.html'),
        createProj('mine-sweeper', 'Mine-Sweeper', `Don't step on mines`, '', 'img/portfolio/mine-sweeper.png'   ,  '20/2/2019', ['Matrixes', 'keyboard events'], 'https://nathaliepalevich.github.io/My-Portfolio/projs/mine-sweeper/index.html'),
        createProj('sokoban', 'Sokoban', 'Better push those boxes', '','img/portfolio/sokoban.png'  ,  '19/5/2019', ['Matrixes', 'keyboard events'], 'https://nathaliepalevich.github.io/My-Portfolio/projs/sokoban/index.html'),
        createProj('day12-pacman', 'pacman', 'Watch out from ghosts', '','img/portfolio/pacman.png'  ,  '17/5/2019', ['Matrixes', 'keyboard events'], 'https://nathaliepalevich.github.io/My-Portfolio/projs/pacman/index.html'),
        createProj('chess-start-here', 'chess', 'Watch out from ghosts', '','img/portfolio/chess.png'  ,  '14/5/2019', ['Matrixes', 'keyboard events'], 'https://nathaliepalevich.github.io/My-Portfolio/projs/chess/index.html'),
        createProj('todo', 'Todo-List', 'Don\'t forget to do...','' ,'img/portfolio/todo.png'  ,  '1/6/2019', ['Matrixes', 'keyboard events'], 'https://nathaliepalevich.github.io/My-Portfolio/projs/todo/index.html')
    ]
}
function getProjs(){
    return gProjs
}