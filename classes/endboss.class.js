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
    }


    animate() {
        setInterval(() => {
            if (world.character.x > 2150 && !this.hadFirstContact) {
                this.hadFirstContact = true;
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.loadImage(this.IMAGES_DEAD[2]);
                this.y = 100;
                return;
            }
            else if (!this.hadFirstContact || world.character.isDead()) {
                this.playAnimation(this.IMAGES_ALERT);
            }
            else if (this.hadFirstContact) {
                if (!this.characterRigthFromEndboss()) {
                    this.otherDirection = false;
                    this.moveLeft();
                }
                else if (this.characterRigthFromEndboss()) {
                    this.otherDirection = true;
                    this.moveRight();
                }
                this.playAnimation(this.IMAGES_WALKING);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 120);
    }

    characterRigthFromEndboss() {
        return (world.character.x - this.width / 2) > this.x;
    }

}

