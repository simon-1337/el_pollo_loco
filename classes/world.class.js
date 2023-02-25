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
    gameOver = false;
    startBackground = new StartBackground;
    gameOverBackground = new GameOverBackground;
    
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
            this.checkGameOver();
            this.checkThrowObjects();
            this.checkCollisions();
        }, 200);
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
        }
    }

    checkCollisionsEnemies() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionsBottlesToCollect() {
        this.level.bottles.forEach((bottle, index) => {
            if ( this.character.isColliding(bottle) && this.character.bottleStorageNotFull()) {
                this.level.bottles.splice(index, 1);
                this.character.bottleStorage++;
                this.bottleBar.setPercentage(this.character.bottleStorage);
            }
        })
    }

    checkGameOver() {
        if (this.character.isDead()) {   //Later also ENDBOSS
            setTimeout(() => {
                gameOver();
                this.gameOver = true;
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
            this.addObjectsToMap(this.level.bottles)
            
            this.ctx.translate(-this.camera_x, 0);

            //// SPACE FOR FIXED OBJECTS ////
            this.addToMap(this.healthBar);
            this.addToMap(this.bottleBar);
            this.addToMap(this.coinBar);
            if (this.gameOver) {
                this.addToMap(this.gameOverBackground);
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
        mo.drawFrame(this.ctx);
        
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