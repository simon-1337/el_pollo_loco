class MoveableObject extends DrawableObject {
    speed = 0.1;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    constructor() {
        super();
    }


    /**
     * This function is used to let items and characters fall down slower at the begin and accelerate
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * This function checks if the object is in the air (after jumping)
     * 
     * @returns either true if object is a bottle or a condition checking if y is smaller then the ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { //throwable objects should always fall
            return true;
        } else {
            return this.y < 172.5;
        }
    }


    /**
     * Formula to detect collision
     * e.g. character.isColliding(chicken) 
     * this is the character and mo is the enemy e.g. the chicken
     * 
     * @param {Object} mo - the object which is checked if it is colliding 
     * @returns the condition to check the collision
     */
    isColliding (mo) {
        return  this.x + this.width - this.offset.right > mo.x + mo.offset.left && // checks if the right side of the character collides with the left side of an object
                this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // checks if the bottom of the character collides with the top of an object -> jumps on something
                this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // checks if the left side of the character collides with the right side of the enemy
                this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // checks if the top of the character collides with the bottom of the enemy 
                //all four directions need to be true to have a collision!
    }
 
    
    /**
     * This function is used to check if a object is hurt
     * 
     * @returns condition to check if the time passed is smaller then 0.25 seconds
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; //difference in ms
        timePassed = timePassed / 1000; //difference in s
        return timePassed < 0.25; 
    }


    /**
     * This function is used to check if an object is dead (has energy lower or equal to zero)
     * 
     * @returns condition to check if energy is lower or equal to zero
     */
    isDead() {
        return this.energy <= 0;
    }


    /**
     * This function is used to play the animations of moveable objects
     * With the modulo operator the images are shown infinitely 
     * 
     * @param {Array} images Images of the Animation saved in an Array
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; // if length = 6: Rest = 0 -> 1 -> ... -> 5 -> 0 -> 1 -> ... 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++; 
    }


    /**
     * This function is used to move an object to the right side,
     * by adding a defined value to the x coordinate
     */
    moveRight() {
        this.x += this.speed;
        
    }

    
    /**
     * This funciton is used to move an object to the left side,
     * by substracting a defined value of the x coordinate
     */
    moveLeft() {
        this.x -= this.speed;
    }
}