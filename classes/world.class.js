class World {
    character = new Character();
    level;
    canvas;
    ctx;   
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar;
    bottleBar = new BottleBar;
    coinBar = new CoinBar;
    endbossBar = new EndbossBar;
    endbossIcon = new EndbossIcon;
    throwableObjects = [];
    gameStarted = false;
    gameLost = false;
    gameWon = false;
    startBackground = new StartBackground;
    gameLostBackground = new GameLostBackground;
    gameWonBackground = new GameWonBackground;
    loaded = false;
    music_won = new Audio ('audio/music.mp3');
    coin_sound = new Audio ('audio/coin.mp3');
    collect_bottle_sound = new Audio ('audio/bottle-collect.mp3');
    jump_on_enemy_sound = new Audio ('audio/hit.mp3');
    bottle_crashes = new Audio ('audio/bottle-crashes.mp3');
    bg_music = new Audio ('audio/background.mp3');
    lastThrow = 0;
    
    
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * This function is used to make the world available by the character
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * This function starts the game once the start or restart button is clicked
     * 
     * @param {Element} buttonID - #Either the id of the start or restart button
     */
    startGame(buttonID) {
        document.getElementById(buttonID).classList.add('d-none');
        //document.getElementById('question-mark-btn').classList.add('d-none');
        this.gameStarted = true;
        this.character.animate();
        this.level = level1;
        this.endboss = this.level.enemies[this.level.enemies.length - 1];
        this.bg_music.loop = true;
        this.bg_music.play()
    }


    /**
     * This function is responsible to mute the game sounds
     */
    muteSound() {
        this.music_won.muted = true;
        this.coin_sound.muted = true;
        this.collect_bottle_sound.muted = true;
        this.jump_on_enemy_sound.muted =true;
        this.bottle_crashes.muted = true;
        this.bg_music.muted = true;
        this.character.walking_sound.muted = true;
        this.character.dying_sound.muted = true;
        this.character.hurting_sound.muted = true;
        this.muteEndboss();
    }


    /**
     * This function is responsible to unmute the game sounds
     */
    unmuteSound() {
        this.music_won.muted = false;
        this.coin_sound.muted = false;
        this.collect_bottle_sound.muted = false;
        this.jump_on_enemy_sound.muted =false;
        this.bottle_crashes.muted = false;
        this.bg_music.muted = false;
        this.character.walking_sound.muted = false;
        this.character.dying_sound.muted = false;
        this.character.hurting_sound.muted = false;
        this.unmuteEndboss();
    }


    /**
     * This function is used to mute the sounds of the Endboss
     */
    muteEndboss() {
        if (this.gameStarted) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    enemy.audio.muted = true;
                    enemy.audio_dead.muted = true;
                }
            });
        }
    }


    /**
     * This function is used to unmute the sounds of the Endboss
     */
    unmuteEndboss() {
        if (this.gameStarted) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    enemy.audio.muted = false;
                    enemy.audio_dead.muted = false;
                }
            });
        }
    }


    /**
     * This function permanently runs to check if the game was lost or won,
     * if there was a collisions with something and if a bottle was thrown
     */
    run() {
        setInterval(() => {
            this.checkGameLost();
            this.checkGameWon();
            this.checkCollisions();
            this.checkThrowObjects(); 
        }, 1000/60);
    }


    /**
     * This function is used to throw the bottles
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottleStorageNotEmpty() && this.readyToThrowAgain()) {
            let bottle = new ThrowableObject(this.character);
            this.throwableObjects.push(bottle);
            this.character.bottleStorage--;
            this.bottleBar.setPercentage(this.character.bottleStorage);
        }
    }


    /**
     * This function is used to check if the time passed since last throwing a bottle is big enough,
     * and setting the lastThrow to the current timestamp if this is the case 
     * 
     * @returns A Boolean value
     */
    readyToThrowAgain() {
        let timePassed = new Date().getTime() - this.lastThrow;
        if (timePassed > 1000) {
            this.lastThrow = new Date().getTime();
            return true;
        }
    }


    /**
     * This function is used to check different collisions
     */
    checkCollisions() {
        if (this.gameStarted) {
            this.checkCollisionsEnemies();
            this.checkCollisionsBottlesToCollect();
            this.checkCollisionsCoinsToCollect();
            this.checkBottleHitEnemy();
        }
    }


    /**
     * This function is used to check if the character collided with an enemy
     */
    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.characterIsFallingDown() && !(enemy instanceof Endboss)) {                        
                    this.damageEnemy(enemy, index);
                    this.setCharacterToImmune();
                    this.character.speedY = 15;
                    this.jump_on_enemy_sound.currentTime = 0;
                    this.jump_on_enemy_sound.play();
                } else if (!this.character.immune) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        });
    }


    /**
     * This function is used to set the character immune against chicken damage for a short time
     */
    setCharacterToImmune() {
        this.character.immune = true;
        setTimeout(() => {
            this.character.immune = false;
        }, 125);
    }


    /**
     * This function is used to check if the character is falling down
     * 
     * @returns a condition which checks if the speed by which the character is moving vertically is smaller zero,
     * and therefore the character is falling and the boolean value for the isAboveGround function
     */
    characterIsFallingDown() {
        return this.character.speedY < 0 && this.character.isAboveGround();
    }


    /**
     * This function is used to check if the character collided with bottles on the ground (to pick them up) 
     */
    checkCollisionsBottlesToCollect() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.bottleStorageNotFull()) {
                this.collect_bottle_sound.currentTime = 0;
                this.collect_bottle_sound.play();
                this.level.bottles.splice(index, 1);
                this.character.bottleStorage++;
                this.bottleBar.setPercentage(this.character.bottleStorage);
            }
        })
    }


    /**
     * This function is used to check if the character collided with coins
     */
    checkCollisionsCoinsToCollect() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coin_sound.currentTime = 0;
                this.coin_sound.play();
                this.level.coins.splice(index, 1);
                this.character.coinStorage++;
                this.coinBar.setPercentage(this.character.coinStorage);
            }
        })
    }


    /**
     * This function is responsible to check if a thrown bottle collides with an enemy 
     */
    checkBottleHitEnemy() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy, index) => {
                if (bottle.isColliding(enemy) && !bottle.destroyed) {
                    this.bottle_crashes.currentTime = 0;
                    this.bottle_crashes.play();
                    this.damageEnemy(enemy, index);
                    bottle.splashBottle(bottle);
                    this.removeBottle(bottleIndex);
                    if (enemy instanceof Endboss) {
                        this.endbossBar.setPercentage(enemy.energy);
                    }
                }
            })
        })
    }


    /**
     * This function removes the bottle that hit an enemy from the throwable object array
     * 
     * @param {*} index 
     */
    removeBottle(index) {
        setTimeout(() => {
            this.throwableObjects.splice(index, 1);
        }, 125);
    }


    /**
     * This function checks if the character is dead and therefore the game is lost.
     * If this is the case audios is paused and Intervals are stopped 
     */
    checkGameLost() {
        if (this.character.isDead()) {
            stopIntervals()
            this.character.pauseSounds();
            this.bg_music.pause();
            setTimeout(() => {
                gameOver();
                this.gameLost = true;
            }, 500);
        }
    }


    /**
     * This function checks if the game is running and if the endboss is dead.
     * If this is the case the function to end the game are called
     */
    checkGameWon() {
        if (this.gameStarted) {
            if (this.endbossIsDead()) {
                setTimeout(() => {
                    gameOver();
                    stopIntervals()
                    this.character.pauseSounds();
                    this.bg_music.pause();
                    this.gameWon = true;
                    stopAllIntervals();
                    this.playWinnerMusic();
               }, 750);   
           }    
        }
    }


    /**
     * This function is used to to start the music when the game has been won
     */
    playWinnerMusic() {
        this.music_won.play()
    }


    /**
     * This function is used to check if the endboss is dead
     * 
     * @returns a boolean value which says if the endboss is dead
     */
    endbossIsDead() {
        let bool = false;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss && enemy.isDead()) {
                bool = true;
            }
        });
        return bool;
    }


    /**
     * This function is responsible to reduce the energy of a hitted enemy
     */
    damageEnemy(enemy, index) {
        enemy.energy -= 100;
        enemy.lastHit = new Date().getTime();
        if (enemy.energy <= 0 && !(enemy instanceof Endboss)) {
            setTimeout(() => {
                this.level.enemies.splice(index, 1);
            }, 225);
        }
    }


    /**
     * This function is used to draw the animations and images in the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.gameStarted) { 
            this.ctx.translate(this.camera_x, 0); //space for moving objects
            this.addMovingObjectsToMap()
            this.ctx.translate(-this.camera_x, 0); //space for fixed objects
            this.addFixedObjects();
        } else {
            this.addToMap(this.startBackground)
        }
        //draw() gets repeatedly executed
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    /**
     * This function is used to add objects which are moving around in the canvas
     */
    addMovingObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    }


    /**
     * This function is used to add fixed objects to the canvas
     */
    addFixedObjects() {
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        if (this.level.enemies[this.level.enemies.length - 1].hadFirstContact) {
            this.addToMap(this.endbossBar);
            this.addToMap(this.endbossIcon);
        }
        if (this.gameLost) {
            this.addToMap(this.gameLostBackground);
        }
        if (this.gameWon) {
            this.addToMap(this.gameWonBackground);
        }
    }


    /**
     * This function is used to iterate over the objects in an array and call the addToMap function on each
     * 
     * @param {Array} objects - Array with several objects in it
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * This function is responsible call the draw function on the object (which draws the image in the canvas)
     * The function also checks if the image shoud be drawn in the other direction 
     * If yes the function flipImage gets called.
     * 
     * @param {*} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);
        
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * This function mirrors the image that is drawn (other direction)
     * 
     * @param {Object} mo - The object that needs to be mirrored 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); // x Achse wird um breite des characters nach links geschoben
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * This function flips the image back after it has been drawn
     * 
     * @param {Object} mo - The object that is flipped back
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    
    /**
     * This function is responsible to pause the music after clicking on restart
     */
    pauseMusic() {
        this.music_won.pause();
    }
}