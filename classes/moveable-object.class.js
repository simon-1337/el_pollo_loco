class MoveableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.1;
    otherDirection = false;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array) {
        array.forEach(path => {
            let img  = new Image();
            img.src = path;
            this.imageCache[path] = img;    
        }); 
    }

    moveRight() {
        console.log('moving right')
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;    
        }, 1000 / 60);
    }
}