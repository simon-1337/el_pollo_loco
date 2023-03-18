class CoinBar extends DrawableObject {
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 20;
        this.y = 60;
        this.width = 150;
        this.height = 40;
        this.img = this.imageCache[this.IMAGES_COIN[0]];
    }

    
    /**
     * This function is used to choose the correct Image for displaying how many coins have been collected
     * 
     * @param {int} numberOfCoins - An integer representing how many coins a player collected
     */
    setPercentage(numberOfCoins) {
        this.img = this.imageCache[this.IMAGES_COIN[numberOfCoins]];
    }
}