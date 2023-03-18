class EndbossBar extends DrawableObject {
    IMAGES_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    ];


    constructor() {
        super();
        this.loadImages(this.IMAGES_BAR);
        this.otherDirection = true;
        this.x = 500;
        this.y = 52;
        this.width = 190;
        this.height = 60;
        this.img = this.imageCache[this.IMAGES_BAR[0]];
    }


    /**
     * This function is used to set the percentage of the health bar for the endboss,
     * and to display the correct healthbar based on this percentage
     * 
     * @param {Int} energy - The energy of the endboss 
     */
    setPercentage(energy) {
        let imagePath = this.IMAGES_BAR[this.resolveImageIndex(energy)];
        this.img = this.imageCache[imagePath];
    }

    
    /**
     * This Function is used to get the index of the image that should be displayed based on the energy of the endboss
     * 
     * @param {Int} energy - The energy of the endboss 
     * @returns An integer indicating the position of the image in the IMAGES_BAR Array
     */
    resolveImageIndex(energy) {
        if (energy == 500) {
            return 0;
        }
        if (energy == 400) {
            return 1;
        }
        if (energy == 300) {
            return 2;
        }
        if (energy == 200) {
            return 3;
        }
        if (energy == 100) {
            return 4;
        }
        else {
            return 5;
        }
    }
}