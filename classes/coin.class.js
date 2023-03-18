class Coin extends CollectableObject {
    height = 160;
    width = 160;
    img = 'img/8_coin/coin_2.png';

    offset = {
        left: 50,
        top: 50,
        right: 100,
        bottom: 100
    }

    
    constructor() {
        super().loadImage(this.img);
        this.y = 70 + Math.random()*150;
    }
}