class Bottle extends CollectableObject {
    y = 350;
    height = 80;
    width = 80;
    img;
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    constructor() {
        super();
        this.selectImage();
        this.loadImage(this.img)
    }

    /**
     * This function selects the image of the created object.
     * It is either the one at index 0 or the one at index 1 in the IMAGES array
     */
    selectImage() {
        let index = Math.floor(Math.random() * 2);  //Expected output: 0 or 1
        this.img = this.IMAGES[index];
    }

}