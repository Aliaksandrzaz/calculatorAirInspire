export class Model {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.coeff = [5, 2, 1, 1];
        this.quantityVertical = 1;
        this.quantityHorizontal = 1;
        this.distanceVertical = 0.65;
        this.distanceHorizontal = 0.65;
        this.regQuantity = /^[\d]+$/;
        this.countImage = 1;
    }

    changeDistanceHorizontal(value) {
        if (this.regQuantity.test(value[0].value)) {
            this.quantityHorizontal = parseInt(value[0].value);
        }
        this.distanceHorizontal = (((this.quantityHorizontal - 1) * 0.465 + 0.65) * 1000) / 1000;
        this.eventEmitter.emit('changeQuantityHorizontal', this.quantityHorizontal);
        this.eventEmitter.emit('changeValueDistanceHorizontal', this.distanceHorizontal.toFixed(2));

    }

    changeDistanceVertical(value) {
        if (this.regQuantity.test(value[1].value)) {
            this.quantityVertical = parseInt(value[1].value);
        }
        this.distanceVertical = (((this.quantityVertical - 1) * 0.465 + 0.65) * 1000) / 1000;
        this.eventEmitter.emit('changeValueDistanceVertical', this.distanceVertical.toFixed(2));
        this.eventEmitter.emit('changeQuantityVertical', this.quantityVertical);
    }

    changeQuantityHorizontal(value) {

        this.quantityHorizontal = Math.round((value[2].value - 0.65) / 0.465 + 1);
        this.distanceHorizontal = (((this.quantityHorizontal - 1) * 0.465 + 0.65) * 1000) / 1000;

        this.eventEmitter.emit('changeQuantityHorizontal', this.quantityHorizontal);
        this.eventEmitter.emit('changeValueDistanceHorizontal', this.distanceHorizontal.toFixed(2));
    }

    changeQuantityVertical(value) {
        this.quantityVertical = Math.round((value[3].value - 0.65) / 0.465 + 1);
        this.distanceVertical = (((this.quantityVertical - 1) * 0.465 + 0.65) * 1000) / 1000;

        this.eventEmitter.emit('changeValueDistanceVertical', this.distanceVertical.toFixed(2));
        this.eventEmitter.emit('changeQuantityVertical', this.quantityVertical);
    }

    outputValue() {
        // [power, weight, quantity, pixels]
        this.sum = this.quantityVertical * this.quantityHorizontal;
        this.power = this.sum * 48;
        this.weight = this.sum * 0.7;
        this.screen = `${(this.quantityHorizontal * 720) - ((this.quantityHorizontal - 1)) * 210}x${(this.quantityVertical * 720) - ((this.quantityVertical - 1)) * 210}`;

        this.eventEmitter.emit('changeOutputValue', [this.sum, this.screen, this.power, this.weight.toFixed(2)]);
    }

    createImage() {
        let matrix = [];

        //rotate & create
        for (let y = 0; y < this.quantityVertical; y++) {
            matrix[y] = [];
            for (let x = 0; x < this.quantityHorizontal; x++) {
                this.countImage++;
                let element = document.createElement('div');

                element.classList.add('output-image__image');

                if (this.countImage % 2 === 0) {
                    element.style.transform = 'rotate(45deg)';
                    element.classList.add('output-image__image--reverse');
                }

                if (this.quantityHorizontal % 2 === 0 && y % 2 !== 0 && x % 2 === 0) {
                    element.style.transform = 'rotate(45deg)';
                }
                else if (this.quantityHorizontal % 2 === 0 && y % 2 !== 0 && x % 2 !== 0) {
                    element.style.transform = 'rotate(0deg)'
                }
                matrix[y][x] = element;
            }
        }

        //translate
        for (let y = 0; y < this.quantityVertical; y++) {
            for (let x = 0; x < this.quantityHorizontal; x++) {
                if (x > 0) {
                    matrix[y][x].style.left = `${-25 * x}%`;
                }
                if (y > 0) {
                    matrix[y][x].style.top = `${-25 * y}%`;
                }
            }
        }


        let doneFragment = document.createDocumentFragment();
        for (let y = 0; y < this.quantityVertical; y++) {
            for (let x = 0; x < this.quantityHorizontal; x++) {
                doneFragment.append(matrix[y][x]);
            }
        }


        this.countImage = 0;

        this.eventEmitter.emit('createImage', {
            // element: element,
            x: doneFragment,
            quantityHorizontal: this.quantityHorizontal,
            quantityVertical: this.quantityVertical
        });
    }


}