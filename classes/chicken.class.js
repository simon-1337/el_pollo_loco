class Chicken extends MoveableObject{
    y = 370;
    height = 70;
    width = 70;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    
        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
    }
}