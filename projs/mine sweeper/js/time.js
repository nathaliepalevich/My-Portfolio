
var count = 0;
var clearTime;
var seconds = 0
var minutes = 0
var hours = 0;
var bestTime2 = `00:00`;
var secs;
var mins;
var gethours;

function startWatch() {
    if (seconds === 60) { seconds = 0; minutes = minutes + 1; }
    mins = (minutes < 10) ? ('0' + minutes + ':') : (minutes + ':');
    if (minutes === 60) { minutes = 0; hours = hours + 1; }
    gethours = (hours < 10) ? ('0' + hours + ':') : (hours + ':');
    secs = (seconds < 10) ? ('0' + seconds) : (seconds);
    var x = document.querySelector('.time');
    x.innerHTML = mins + secs;
    seconds++;
    gGame.secsPassed += 1
    // console.log(gGame.secsPassed)
    clearTime = setTimeout(startWatch, 1000);
    bestTime2 = mins + secs
}

function startTime() {

    if (seconds === 0 && minutes === 0 && hours === 0) {
        startWatch();
    }

}

function stopTime() {


    if (seconds !== 0 || minutes !== 0) {
        seconds = 0;
        minutes = 0;
        hours = 0;
        secs = '0' + seconds;
        mins = '0' + minutes + ': ';


        clearTimeout(clearTime);
    }

}