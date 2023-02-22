let canvas;
let world;
let keyboard = new Keyboard();
let allIntervals = [];
 
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}


function gameOver() {
    stopIntevals();
    displayRestartButton();
    //evtl stop audio
}


function displayRestartButton() {
    document.getElementById('restart-button').classList.remove('d-none');
}


function stopIntevals() {
    allIntervals.forEach(clearInterval);
}


function stopAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function restartGame() {
    stopAllIntervals()
    init();
    initLevel();
    world.startGame('restart-button');
}


window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    } 
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
})