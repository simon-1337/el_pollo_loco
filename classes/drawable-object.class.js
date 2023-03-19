class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 100;
    y = 250; 
    height = 150;
    width = 100; 
    otherDirection = false;
    offset = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }


    /**
     * This function is responsible to create a new Image object
     * 
     * @param {String} path - The src of the Image that is loaded 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.img.onload = () => { 
            this.checkIfImagesLoaded();
        }
    }


    /**
     * This function draws the current image in the canvas
     * 
     * @param {Element} ctx - The 2d context of the canvas 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function is used to draw a frame, to make the borders of an object visible
     * 
     * @param {Element} ctx - The 2d context of the canvas
     */
    drawFrame(ctx) {
        if (this instanceof Endboss){
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }


    /**
     * This function is used to create a new Image Object for each image in an Array
     * 
     * @param {Array} array - Images saved in this Array
     */
    loadImages(array) {
        array.forEach(path => {
            let img  = new Image();
            img.src = path;
            this.imageCache[path] = img;  
        }); 
    }


    /**
     * This function closes the loading screen if either the Startscreen or the last image of the Background have been loaded
     */
    checkIfImagesLoaded() {
        if (this.checkIfBackgroundImage() || this.checkIfStartScreen()) {
            closeLoadingScreen()
        }
    }


    /**
     * This function is used to check if the last image of the Background has been loaded
     * 
     * @returns A boolean value
     */
    checkIfBackgroundImage() {
        return this.img.src == (window.location.href + 'img/5_background/layers/1_first_layer/2.png') && world.loaded == false;
    }

    
    /**
     * This function is used to check if the startscreen has been loaded succesfully
     * 
     * @returns A boolean value
     */
    checkIfStartScreen() {
        return this.img.src == (window.location.href + 'img/9_intro_outro_screens/start/startscreen_2.png');
    }
}

