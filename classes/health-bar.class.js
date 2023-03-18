class HealthBar extends DrawableObject {
    percentage = 100;
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 20;
        this.y = 0;
        this.width = 150;
        this.height = 40;
        this.setPercentage(100);
    }


    /**
     * This function is used to set the percentage of the health bar for the character,
     * and to display the correct healthbar based on this percentage
     * 
     * @param {Int} percentage - The percentage of the healthbar 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }

    
    /**
     * This Function is used to get the index of the image that should be displayed based on the percentage
     * 
     * @returns An integer indicating the position of the image in the IMAGES_HEALTH Array
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        }else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}

