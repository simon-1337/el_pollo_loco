class Cloud extends MoveableObject {
    y = 50;
    width = 500;
    height = 250;
    

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        
        this.x = Math.random() * 500;  
        this.animate();
    }

    
    /**
     * This function is used to animate the movement of the clouds
     */
    animate() {
        this.moveLeft();
    }
}