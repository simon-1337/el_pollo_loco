class ThrowableObject extends MoveableObject {

    constructor(character) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
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
    }
}