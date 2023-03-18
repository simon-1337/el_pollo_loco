class Character extends MoveableObject {
    height = 260;
    width = 130;
    y = 170;
    speed = 10;
    offset = {
        left: 40,
        top: 60,
        right: 30,
        bottom: 30
    }
    idle = false;
    bottleStorage = 0;
    coinStorage = 0;
    idleTime = 0;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',

    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    world;
    walking_sound = new Audio('audio/walking.mp3');
    dying_sound = new Audio('audio/player-dies.mp3');
    dyingSoundPlayed = false;
    hurting_sound = new Audio('audio/player-hurt.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.walking_sound.playbackRate = 2.25;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
    }
  
    
    /**
     * This function is used to set the speed of the Y Axis to 30 and therfore jump with the Character.
     */
    jump() {
        this.speedY = 30;
    }


    /**
     * This function gets executed when an enemy hits the character and reduces the energy by one.
     */
    hit() {
        this.energy -= 1;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * This function is used to check if the character is already standing still for a longer time.
     * 
     * @returns a condition that is true if the idleTime is higher than 50.
     */
    longIdleTime() {
        return this.idleTime > 50;
    }


    /**
     * This function resets the values necessary for the idle, when the character is moved.
     */
    resetIdleValues() {
        this.idleTime = 0;
        this.idle = false;
    }


    /**
     * This function checks if the bottle storage is not full yet.
     * 
     * @returns a condition checking if the number in the variable bottleStorage is smaller than 5.
     */
    bottleStorageNotFull() {
        return this.bottleStorage < 5;
    }


    /**
     * This function checks if the bottle storage is not empty.
     * 
     * @returns a condition checking if the number in the variable bottleStorage is higher than 0.
     */
    bottleStorageNotEmpty() {
        return this.bottleStorage > 0;
    }


    /**
     * This function is used to pause the walking sounds of the character
     */
    pauseSounds() {
        this.walking_sound.pause();
    }


    /**
     * This function is used to play the dying sound. However, only when it is the first time.
     * After the first time the dyingSoundPlayed Boolean is set to true and therefore the sound is not played in a loop.
     */
    playDyingSound() {
        if (!this.dyingSoundPlayed) {
            this.dying_sound.play();
            setTimeout(() => {
                this.dying_sound.pause();
            }, 750);
            this.dyingSoundPlayed = true;
        }
    }


    /**
     * This function is used to animate the character
     */
    animate() {
        setStoppableInterval(() => {
            this.pauseSounds();
            this.characterKeyActions();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {
            this.animateCharacterMovement();  
        }, 50);
    }


    /**
     * This function is responsible to perform the actions of the character depending on the key that are pressed.
     */
    characterKeyActions() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveCharacterRight();
        } 
        if (this.world.keyboard.LEFT && this.x > -719) {
            this.moveCharacterLeft();
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.resetIdleValues();
        }
        if (this.world.keyboard.D) {
            this.resetIdleValues();
        }
        else {
            this.idle = true;
        }
    }


    /**
     * This function is used to move the character to the right
     */
    moveCharacterRight() {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
        this.resetIdleValues();
    }


    /**
     * This function is used to move the character to the left
     */
    moveCharacterLeft() {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
        this.resetIdleValues();
    }


    /**
     * This function is used to animate the characters movements (also when hurted or dead)
     */
    animateCharacterMovement() {
        if (this.isDead()) {
            this.animateCharacterDeath();
        } else if (this.isHurt()) {
            this.animateCharacterHurt();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.characterIsWalking()) {
            this.playAnimation(this.IMAGES_WALKING);   
        } else if (this.characterIsStandingStill) {
            this.animateIdleness();
        }   
    }


    /**
     * This function is used for the animation when the player died
     */
    animateCharacterDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        this.playDyingSound();
        this.y += 20;
    }


    /**
     * This function is responsible for the animation when the character is hurted 
     */
    animateCharacterHurt() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurting_sound.play();
    }


    /**
     * This function is used to check if the character is walking (either left or right)
     * 
     * @returns A condition if the key to move left or the key to move right is pressed
     */
    characterIsWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    /**
     * This function is responsible to check if the character is standing still (not moving)
     * 
     * @returns the Boolean value stored in the variable idle
     */
    characterIsStandingStill() {
        return this.idle;
    }
 
    
    /**
     * This functions task is to play the animation when the character is standing still
     */
    animateIdleness() {
        this.idleTime++;
        if (this.longIdleTime()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }
}

