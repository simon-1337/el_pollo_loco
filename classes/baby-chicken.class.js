class BabyChicken extends MoveableObject {
    y = 360;
    height = 70;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 2000; // Zahl zwischen 200 und 700
        this.speed = 0.5 + Math.random() * 0.75;
        this.animate();
    }


    /**
     * This function is used to animate the Baby-Chickens
     */    
    animate() {
        this.animateMovementOnXAxis();
        this.animateBabyChicken();
    }


    /**
     * This function is responsible for moving the Baby-Chickens on the x-Axis
     */
    animateMovementOnXAxis() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }   
        }, 1000 / 60);
    }

    
    /**
     * This function is responsible for animate the Baby-Chickens walking and display the dead Chicken if it died
     */
    animateBabyChicken() {
        setInterval(() => {
            if (this.isDead()) {
                this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png')
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 120);
    }
}    

