class ThrowableObject extends MoveableObject {

    IMAGES_SPINNING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    constructor(character) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPINNING);
        this.otherDirection = character.otherDirection;
        this.x = character.x;
        this.y = character.y + 100;
        this.height = 80;
        this.width = 80;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        if (this.otherDirection) {
            this.x -= 20;
            setInterval(() => {
                this.x -= 10;
            }, 25); 
        } else {
            this.x += 70;
            setInterval(() => {
                this.x += 10;
            }, 25);
        }   
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPINNING);
        }, 60);    
    }
}