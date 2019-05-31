var gBestScore = +localStorage.getItem('BEST_SCORE');
var userName1 = localStorage.getItem('userName');
var time = localStorage.getItem('TIME');
var userName = null;

function saveBestScore() {
    if (gGame.fullRow > gBestScore) {
        userName = prompt('what is your name?')
        localStorage.setItem(`userName`, userName)
        localStorage.setItem(`BEST_SCORE`, gGame.fullRow)

        gBestScore = gGame.fullRow
        userName1 = localStorage.getItem(`userName`)
    }
}

function ShowBestScore(){
    var elDiv = document.querySelector('.best-player')
    elDiv.classList.toggle('hide')
    elDiv.innerHTML = `BEST PLAYER: ${userName1}<br><br>BEST SCORE: ${gBestScore} <br> `
}