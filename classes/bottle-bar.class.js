class BottleBar extends DrawableObject {
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 20;
        this.y = 30;
        this.width = 150;
        this.height = 40;
        this.img = this.imageCache[this.IMAGES_BOTTLE[0]];
    }

    
    /**
     * This function is used to choose the correct Image for displaying how many bottles a player has
     *       
     * @param {int} numberOfBottles - An integer representing how many Bottles a player currently has
     */
    setPercentage(numberOfBottles) {
        this.img = this.imageCache[this.IMAGES_BOTTLE[numberOfBottles]];
    }
}