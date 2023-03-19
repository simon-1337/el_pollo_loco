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
 * @param {Function} fn - the code of the function that is executed in this interval 
 * @param {Number} time - the time of the interval in ms
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    allIntervals.push(id);
}


/**
 * This function is used to display the restart button and the questionmark button once the game is over
 */
function gameOver() {
    displayRestartButton();
    //displayQuestionMarkButton();
}


/**
 * This function is used to display the restart button
 */
function displayRestartButton() {
    document.getElementById('restart-button').classList.remove('d-none');
}


// /**
//  * This function is used to display the questionmark button
//  */
// function displayQuestionMarkButton() {
//     document.getElementById('question-mark-btn').classList.remove('d-none');
// }


/**
 * This function is used to display the help screen
 */
function displayHelp() {
    document.getElementById('help-screen').classList.remove('d-none');
}


/**
 * This function is used to stop displaying the help screen
 */
function closeHelp() {
    document.getElementById('help-screen').classList.add('d-none');
}


/**
 * This function is used to stop all stoppableintervals 
 */
function stopIntervals() {
    allIntervals.forEach(clearInterval);
}


/**
 * This function is used to stop ALL intervals
 */
function stopAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * This function is used to stop displaying the loading screen
 */
function closeLoadingScreen() {
    document.getElementById('loading-screen').classList.add('d-none');
    if (world.gameStarted) {
        world.loaded = true;
    }
}


/**
 * This function is used to display the loading screen
 */
function displayLoadingScreen() {
    console.log('loadingscreen opened')
    document.getElementById('loading-screen').classList.remove('d-none');
}


/**
 * This function is executed once a player clicks on restart
 * It Stops all running Intervals and inits a new game
 */
function restartGame() {
    stopAllIntervals()
    init();
    initLevel();
    world.startGame('restart-button');
}


/**
 * This function is responsible to call the functions for muting the game
 */
function mute() {
    displayMuteButton();
    world.muteSound();
}

/**
 * This function is used to display the muted symbol
 */
function displayMuteButton() {
    document.getElementById('mute-btn').classList.add('d-none');
    document.getElementById('unmute-btn').classList.remove('d-none');
}


/**
 * This function is responsible to call the functions for unmuting the game
 */
function unmute() {
    displaySoundButton();
    world.unmuteSound();
}

/**
 * This function is responsible to display the unmuted symbol
 */
function displaySoundButton() {
    document.getElementById('mute-btn').classList.remove('d-none');
    document.getElementById('unmute-btn').classList.add('d-none');
}


/**
 * This function is used to check if the screen is in fullscreen mode or not
 */
function checkFullscreen() {
    if (document.fullscreenElement) {
        closeFullscreen();     
    } else {
        let screen = document.getElementById('fullscreen');
        openFullscreen(screen);
    }
}


/**
 * This function is used to start fullscreen mode
 * 
 * @param {Element} elem - The div container in which the camvas,... is placed 
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
    elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
    }
}


/**
 * This function is used to exit the fullscreen mode
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }   
}  


/**
 * This function is used to call function which are responsible to listen for a specific button to be pressed on the touchscreen
 */
function touchEventListener() {
    touchEventListenerLeft();
    touchEventListenerRight();
    touchEventListenerJump();
    touchEventListenerThrow();
}


/**
 * This function listens if the btn to move the character to the left is pressed on a mobile device 
 */
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


/**
 * This function listens if the btn to move the character to the right is pressed on a mobile device 
 */
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


/**
 * This function listens if the btn to jump the character is pressed on a mobile device 
 */
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


/**
 * This function listens if the btn to throw a bottle is pressed on a mobile device 
 */
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