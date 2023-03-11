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

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.x = 2700;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
            if (world.character.x > 2120 && !this.hadFirstContact) {
                this.hadFirstContact = true;
            }
            if (world.character.x > 2300) {
                //ATTACK
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.loadImage(this.IMAGES_DEAD[2]);
                this.y = 100;
                return;
            }

        }, 120);
    }
}