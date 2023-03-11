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
        this.y = 0;
        this.width = 190;
        this.height = 60;
        this.img = this.imageCache[this.IMAGES_BAR[0]];
    }

    setPercentage(energy) {
        let imagePath = this.IMAGES_BAR[this.resolveImageIndex(energy)];
        this.img = this.imageCache[imagePath];
    }

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