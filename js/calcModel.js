export class Model {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.coeff = [5, 2, 1, 1];
        this.quantityVertical = 1;
        this.quantityHorizontal = 1;
        this.distanceVertical = 0.65;
        this.distanceHorizontal = 0.65;
        this.regQuantity = /^[\d]+$/;
        this.countImage = 0;
    }

    changeDistanceHorizontal(value) {
        if (this.regQuantity.test(value[2].value)) {
            this.quantityHorizontal = parseInt(value[2].value);
        }
        this.distanceHorizontal = (((this.quantityHorizontal - 1) * 0.465 + 0.65) * 1000) / 1000;
        this.eventEmitter.emit('changeValueDistanceHorizontal', this.distanceHorizontal.toFixed(3));
        this.eventEmitter.emit('changeQuantityHorizontal', this.quantityHorizontal);
    }

    changeDistanceVertical(value) {
        if (this.regQuantity.test(value[3].value)) {
            this.quantityVertical = parseInt(value[3].value);
        }
        this.distanceVertical = (((this.quantityVertical - 1) * 0.465 + 0.65) * 1000) / 1000;
        this.eventEmitter.emit('changeValueDistanceVertical', this.distanceVertical.toFixed(3));
        this.eventEmitter.emit('changeQuantityVertical', this.quantityVertical);
    }

    changeQuantityHorizontal(value) {
        this.quantityHorizontal = Math.round((value[0].value - 0.65) / 0.465 + 1);
        this.eventEmitter.emit('changeQuantityHorizontal', this.quantityHorizontal);
    }

    changeQuantityVertical(value) {
        this.quantityVertical = Math.round((value[1].value - 0.65) / 0.465 + 1);
        this.eventEmitter.emit('changeQuantityVertical', this.quantityVertical);
    }

    outputValue() {
        // [power, weight, quantity, pixels]
        this.sum = this.quantityVertical * this.quantityHorizontal;
        this.power = this.sum * 48;
        this.weight = this.sum * 0.7;
        this.screen = `${(this.quantityHorizontal * 720) - ((this.quantityHorizontal - 1)) * 210}x${(this.quantityVertical * 720) - ((this.quantityVertical - 1)) * 210}`;

        this.eventEmitter.emit('changeOutputValue', [this.power, this.weight.toFixed(2), this.sum, this.screen]);
    }

    createImage() {

        let fragment = new Array(this.quantityVertical * this.quantityHorizontal).fill(null);
        let z = fragment.reduce((acc, el) => {
            let element = document.createElement('div');
            let classImage = this.countImage % 2 === 0 ? 'output-image__vertical' : 'output-image__horizontal';
            // element.style.transform = this.countImage % 2 === 0 ? 'rotate(45deg)' : 'rotate(0deg)';

            this.countImage++;
            element.classList.add(classImage);
            acc.append(element);
            return acc;
        }, document.createDocumentFragment());

        this.eventEmitter.emit('createImage', {
            // element: element,
            x: z,
            quantityHorizontal: this.quantityHorizontal,
            quantityVertical: this.quantityVertical
        });
    }

}