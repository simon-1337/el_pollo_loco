class ThrowableObject extends MoveableObject {
    destroyed = false;
    IMAGES_SPINNING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]


    constructor(character) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPINNING);
        this.loadImages(this.IMAGES_SPLASH);
        this.otherDirection = character.otherDirection;
        this.x = character.x;
        this.y = character.y + 100;
        this.height = 80;
        this.width = 80;
        this.throw();
    }


    /**
     * This function is used to splash the thrown bottle once it was thrown
     * The specifications that the splashes are drawn are set with this function
     * 
     * @param {Object} bottle - The thrown bottle
     */
    splashBottle(bottle) {
        bottle.destroyed = true;
        bottle.acceleration = 0;
        bottle.speedY = 0;
    }


    /**
     * This function animates the throw of the bottle
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        if (this.otherDirection) {
            this.x -= 20;
            this.throwLeft();
        } else {
            this.x += 70;
            this.throwRight();
        }
        this.throwAnimations();   
    }


    /**
     * This function is used to throw the bottle to the left from the character
     */
    throwLeft() {
        setInterval(() => {
            if (!this.destroyed) {
                this.x -= 10;
            } else {
                this.x -= 0;
            }
        }, 25); 
    }


    /**
     * This function is used to throw the bottle to the right from the character
     */
    throwRight() {
        setInterval(() => {
            if (!this.destroyed) {
                this.x += 10;
            } else {
                this.x += 0;
            }
        }, 25);
    }

    
    /**
     * This function plays the animations to spin and splash the bottles
     */
    throwAnimations() {
        setInterval(() => {
            if (this.destroyed == false) {
                this.playAnimation(this.IMAGES_SPINNING);
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 60);   
    }
}