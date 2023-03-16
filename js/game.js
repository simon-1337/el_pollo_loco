let canvas;
let world;
let keyboard = new Keyboard();
let allIntervals = [];

/**
 * This function initiate the world and starts the Eventlistener to know when buttons are touched on a mobile device
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    touchEventListener()
}


/**
 * This function is used to set an interval which can be stopped
 * 
 * @param {*} fn 
 * @param {*} time 
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}


function gameOver() {
    displayRestartButton();
    displayQuestionMarkButton();
    //evtl stop audio
}


function displayRestartButton() {
    document.getElementById('restart-button').classList.remove('d-none');
}


function displayQuestionMarkButton() {
    document.getElementById('question-mark-btn').classList.remove('d-none');
}


function displayHelp() {
    document.getElementById('help-screen').classList.remove('d-none');
}


function closeHelp() {
    document.getElementById('help-screen').classList.add('d-none');
}


function stopIntervals() {
    allIntervals.forEach(clearInterval);
}


function stopAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function closeLoadingScreen() {
    document.getElementById('loading-screen').classList.add('d-none');
    if (world.gameStarted) {
        world.loaded = true;
    }
}


function displayLoadingScreen() {
    console.log('loadingscreen opened')
    document.getElementById('loading-screen').classList.remove('d-none');
}


function restartGame() {
    stopAllIntervals()
    init();
    initLevel();
    world.startGame('restart-button');
}


// function checkFullscreen() {
//     if (document.fullscreenElement) {
//         closeFullscreen();
//     } else {
//         let screen = document.getElementById('fullscreen');
//         openFullscreen(screen);
//     }
// }


// function changeToOpenText() {
//     document.getElementById('fullscreen-text').innerHTML = 'Press &lt;ENTER&gt; to play in Fullscreen mode';
// }


// function changeToExitText() {
//     document.getElementById('fullscreen-text').innerHTML = 'Press &lt;ENTER&gt; or &lt;ESC&gt; to exit Fullscreen mode';
// }


/* View in fullscreen */
// function openFullscreen(elem) {
//     if (elem.requestFullscreen) {
//       elem.requestFullscreen();
//     } else if (elem.webkitRequestFullscreen) { /* Safari */
//       elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) { /* IE11 */
//       elem.msRequestFullscreen();
//     }
//   }


// /* Close fullscreen */
// function closeFullscreen() {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) { /* Safari */
//       document.webkitExitFullscreen();
//     } else if (document.msExitFullscreen) { /* IE11 */
//       document.msExitFullscreen();
//     }
//   }  


function touchEventListener() {
    touchEventListenerLeft();
    touchEventListenerRight();
    touchEventListenerJump();
    touchEventListenerThrow();
}



function touchEventListenerLeft() {
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        keyboard.LEFT = true;
        e.preventDefault();
    });
    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        keyboard.LEFT = false;
        e.preventDefault();
    });
}


function touchEventListenerRight() {
    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        keyboard.RIGHT = true;
        e.preventDefault();
    });
    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        keyboard.RIGHT = false;
        e.preventDefault();
    });
}


function touchEventListenerJump() {
    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        keyboard.SPACE = true;
        e.preventDefault();
    });
    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        keyboard.SPACE = false;
        e.preventDefault();
    });
}


function touchEventListenerThrow() {
    document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
        keyboard.D = true;
        e.preventDefault();
    });
    document.getElementById('btn-throw').addEventListener('touchend', (e) => {
        keyboard.D = false;
        e.preventDefault();
    });
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