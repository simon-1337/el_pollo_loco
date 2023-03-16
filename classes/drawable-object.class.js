class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280; 
    height = 150;
    width = 100; 
    otherDirection = false;
    offset = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => { 
            this.checkIfImagesLoaded();
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof BabyChicken || this instanceof Endboss){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }

    loadImages(array) {
        array.forEach(path => {
            let img  = new Image();
            img.src = path;
            this.imageCache[path] = img;  
            console.log(path);
        }); 
    }

    checkIfImagesLoaded() {
        if (this.checkIfBackgroundImage() || this.checkIfStartScreen()) {
            closeLoadingScreen()
        }
    }

    checkIfBackgroundImage() {
        return this.img.src == (window.location.href + 'img/5_background/layers/1_first_layer/2.png') && world.loaded == false;
    }

    checkIfStartScreen() {
        return this.img.src == (window.location.href + 'img/9_intro_outro_screens/start/startscreen_2.png');
    }
}

