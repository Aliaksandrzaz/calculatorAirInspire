export class Controller {
    constructor(model) {
        this.model = model;
    }

    changeOutputValue1(value) {
        this.model.changeQuantityHorizontal(value);
        this.model.changeQuantityVertical(value);
        this.model.createImage();
        this.model.outputValue();
    }

    changeOutputValue2(value) {
        this.model.changeDistanceHorizontal(value);
        this.model.changeDistanceVertical(value);
        this.model.createImage();
        this.model.outputValue();
    }

    createFieldImage() {
        this.model.createImage()
    }
}
