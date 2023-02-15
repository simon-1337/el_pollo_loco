class MoveableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        return this.y < 160;
    }

    //Formel to detect collision
    //character.isColliding(chicken) 
    // this is the character and mo is the enemy e.g. the chicken
    isColliding (mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left && // checks if the right side of the character collides with the left side of an object
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // checks if the bottom of the character collides with the top of an object -> jumps on something
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // checks if the left side of the character collides with the right side of the enemy
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // checks if the top of the character collides with the bottom of the enemy 
                //all four directions need to be true to have a collision!
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime() ;
        }
    }
    
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //difference in ms
        timePassed = timePassed / 1000; //difference in s
        return timePassed < 1; 
    }

    isDead() {
        return this.energy == 0;
    }

    offset = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // if length = 6: Rest = 0 -> 1 -> ... -> 5 -> 0 -> 1 -> ... 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
    }

    moveRight() {
        this.x += this.speed;
        
    }

    moveLeft() {
        this.x -= this.speed;
    }
}