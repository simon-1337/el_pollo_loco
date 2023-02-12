class Character extends MoveableObject {
    height = 260;
    width = 130;
    y = 10;
    speed = 10;
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
        'img/2_character_pepe/3_jump/J-40.png',
    ];
    world;
    walking_sound = new Audio('audio/walking.mp3');


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.walking_sound.playbackRate = 2.25;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animate();
        this.applyGravity();
    }
    
    jump() {
        this.speedY = 30;
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > -719) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump()
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {

            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //walk animation
                    this.playAnimation(this.IMAGES_WALKING);   
                }
            }
              
        }, 50);
    }
}