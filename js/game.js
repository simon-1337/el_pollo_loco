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


function checkFullscreen() {
    if (document.fullscreenElement) {
        closeFullscreen();
    } else {
        let screen = document.getElementById('fullscreen');
        openFullscreen(screen);
    }
}


// function changeToOpenText() {
//     document.getElementById('fullscreen-text').innerHTML = 'Press &lt;ENTER&gt; to play in Fullscreen mode';
// }


// function changeToExitText() {
//     document.getElementById('fullscreen-text').innerHTML = 'Press &lt;ENTER&gt; or &lt;ESC&gt; to exit Fullscreen mode';
// }


/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }


/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
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
    if (event.keyCode == 13) {
        checkFullscreen();
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