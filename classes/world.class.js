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
    throwableObjects = [];
    gameStarted = false;
    gameLost = false;
    startBackground = new StartBackground;
    gameLostBackground = new GameLostBackground;
    
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    startGame(buttonID) {
        document.getElementById(buttonID).classList.add('d-none');
        this.gameStarted = true;
        this.character.animate();
        this.level = level1;
    }

    run() {
        setInterval(() => {
            this.checkGameLost();
            this.checkCollisions();
        }, 1000/60);
        setInterval(() => {
            this.checkThrowObjects(); 
        }, 150);
    }

    //checks is key to throw object is pressed
    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottleStorageNotEmpty()) {
            let bottle = new ThrowableObject(this.character);
            this.throwableObjects.push(bottle);
            this.character.bottleStorage--;
            this.bottleBar.setPercentage(this.character.bottleStorage);
        }
    }

    checkCollisions() {
        if (this.gameStarted) {
            this.checkCollisionsEnemies();
            this.checkCollisionsBottlesToCollect();
            this.checkCollisionsCoinsToCollect();
            this.checkBottleHitEnemy();
        }
    }

    checkCollisionsEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isColliding(enemy) && !enemy.isDead()) {
                if (this.characterIsFallingDown() && !(enemy instanceof Endboss)) {                        
                    this.damageEnemy(enemy, index);
                    this.character.speedY = 15;
                } else {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    characterIsFallingDown() {
        return this.character.speedY < 0 && this.character.isAboveGround();
    }

    checkCollisionsBottlesToCollect() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.character.bottleStorageNotFull()) {
                this.level.bottles.splice(index, 1);
                this.character.bottleStorage++;
                this.bottleBar.setPercentage(this.character.bottleStorage);
            }
        })
    }

    checkCollisionsCoinsToCollect() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                this.character.coinStorage++;
                this.coinBar.setPercentage(this.character.coinStorage);
            }
        })
    }

    checkBottleHitEnemy() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach((enemy, index) => {
                if (bottle.isColliding(enemy) && !bottle.destroyed) {
                    this.damageEnemy(enemy, index);
                    bottle.splashBottle(bottle);
                    this.removeBottle(index);
                }
            })
        })
    }

    removeBottle(index) {
        setTimeout(() => {
            this.throwableObjects.splice(index, 1);
        }, 225);
    }

    checkGameLost() {
        if (this.character.isDead()) {   //Later also ENDBOSS
            setTimeout(() => {
                gameLost();
                this.gameLost = true;
            }, 500);
        }
    }

    damageEnemy(enemy, index) {
        enemy.energy -= 100;
        if (enemy.energy <= 0 && !(enemy instanceof Endboss)) {
            setTimeout(() => {
                this.level.enemies.splice(index, 1);
            }, 500);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.gameStarted) { 
            this.ctx.translate(this.camera_x, 0);
            //// SPACE FOR MOVING OBJECTS ////
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.throwableObjects);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.level.coins);
            
            this.ctx.translate(-this.camera_x, 0);

            //// SPACE FOR FIXED OBJECTS ////
            this.addToMap(this.healthBar);
            this.addToMap(this.bottleBar);
            this.addToMap(this.coinBar);
            if (this.gameLost) {
                this.addToMap(this.gameLostBackground);
            }
        } else {
            this.addToMap(this.startBackground)
        }
        //draw() gets repeatedly executed
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); // x Achse wird um breite des characters nach links geschoben
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}