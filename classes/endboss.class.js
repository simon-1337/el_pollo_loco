class Endboss extends MoveableObject {

    height = 400;
    width = 343;
    y = 60;
    energy = 500;
    hadFirstContact = false;
    offset = {
        left: 100,
        top: 180,
        right: 100,
        bottom: 200
    };
    speed = 10;
    x = 2700;
    rageMode = false;
    firstRage = true;
    audio = new Audio ('audio/chicken.mp3');
    audio_dead = new Audio ('audio/endboss_dead.mp3')

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.animate();
        this.checkRageMode();
    }


    /**
     * This function is responsibler for checking if the energy level of the Endboss equals or is lower than 200.
     * If this is the case the boolean rageMode is set to true and the speed of the object is increased.
     */
    checkRageMode() {
        setInterval(() => {
            if (this.energy <= 200) {
                this.rageMode = true;
                this.speed = 20;
            }
        }, 1000/60);
    }


    /**
     * This function is used to check if the character is right from the Endboss on the x-coordinate.
     * 
     * @returns A boolean value
     */
    characterRigthFromEndboss() {
        return (world.character.x - this.width / 2) > this.x;
    }


    /**
     * This function animates the movements/actions of the Endboss and check if a first contact between the character and endboss happened
     */
    animate() {
        setInterval(() => {
            this.checkFirstContact()
            if (this.isDead()) {
                this.endBossIsDead();
                return;
            } else {
                this.animateEndboss()
            }
        }, 120);
    }


    /**
     * This function checks if the player had already contact with the Endboss
     */
    checkFirstContact() {
        if (world.character.x > 2150 && !this.hadFirstContact) {
            this.hadFirstContact = true;
            this.audio.play();
        }
    }


    /**
     * This function is responsible to display the death of the endboss correctly
     */
    endBossIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.loadImage(this.IMAGES_DEAD[2]);
        this.y = 100;
        this.audio_dead.play();
    }


    /**
     * This function is used animate the endboss actions or call the function that are responsible for the animation
     */
    animateEndboss() {
        if (!this.hadFirstContact || world.character.isDead()) {
            this.playAnimation(this.IMAGES_ALERT);
        }
        else if (this.isHurt()) {
            this.endbossHurt();
        }
        else if (this.hadFirstContact) {
            this.animateEndbossMovement()
        }
    }


    /**
     * This function is used to show that the Endboss is hurt
     */
    endbossHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.counterAttack = true;

    }


    /**
     * This function is used to animate the movement of the Endboss
     * There are two modes one time the rage mode and the normal walking mode
     */
    animateEndbossMovement() {
        if (this.rageMode) {
            this.animateRageMode();  
        } else {
            this.animateWalking();
        } 
    }


    /**
     * This function is responsible to animate the Endboss if rage mode is activated
     */
    animateRageMode() {
        this.playChickenSound();
        if (!this.characterRigthFromEndboss()) {
            this.otherDirection = false;
            this.moveLeft();
            this.playAnimation(this.IMAGES_ATTACKING);
        } 
        else if (this.characterRigthFromEndboss()) {
            this.otherDirection = true;
            this.moveRight();
            this.playAnimation(this.IMAGES_ATTACKING);
        }
    }


    /**
     * This function is used to randomly play the sound of the Endboss when it is in rage mode
     */
    playChickenSound() {
        this.playFirstRageSound();
        this.playRandomRageSound();
    }


    /**
     * This function is used to play the sound of the Endboss the first time rage mode is activated 
     */
    playFirstRageSound() {
        if (this.firstRage) {
            this.audio.play();
            this.firstRage = false;
        }
    }


    /**
     * This function is used to play the sound of the Endboss randomly while rage mode
     */
    playRandomRageSound() {
        let random = Math.random() * 100;
        if (random < 10) {
            this.audio.play();
        }
    }

    
    /**
     * This function plays the normal walking animations of the Endboss
     */
    animateWalking() {
        if (!this.characterRigthFromEndboss()) {
            this.otherDirection = false;
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }
        else if (this.characterRigthFromEndboss()) {
            this.otherDirection = true;
            this.moveRight();
            this.playAnimation(this.IMAGES_WALKING);
        }
    }
}

