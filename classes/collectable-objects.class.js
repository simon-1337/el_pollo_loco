class CollectableObject extends DrawableObject {
    x = 300;

    constructor() {
        super();
        this.x = 350 + Math.random() * 2000;
    }

}