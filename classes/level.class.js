class Level {
    enemies;
    clouds;
    backgroundObjects = [];
    level_end_x = 400;

    constructor(enemies, clouds) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.addBackgroundObjects();
    }

    addBackgroundObjects() {
        for (let i = -2; i < 6; i += 2) {
            this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', 719 * i));
            this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * i));
            this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * i));
            this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * i));

            this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', 719 * (i + 1)));
            this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * (i + 1)));
            this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * (i + 1)));
            this.backgroundObjects.push(new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * (i + 1)));
            this.level_end_x = 719 * (i + 1);
        }
    }
}

