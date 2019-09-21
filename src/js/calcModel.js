export class Model {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.quantityVertical = 3;
        this.quantityHorizontal = 3;
        this.distanceVertical = 1.58;
        this.distanceHorizontal = 1.58;
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
        if (this.quantityHorizontal === parseInt(value[0].value) && value[2].value >= 0.65) {
            this.quantityHorizontal = Math.round((value[2].value - 0.65) / 0.465 + 1);
        }
        else {
            this.quantityHorizontal = parseInt(value[0].value);
        }
        this.distanceHorizontal = (((this.quantityHorizontal - 1) * 0.465 + 0.65) * 1000) / 1000;
        this.eventEmitter.emit('changeQuantityHorizontal', this.quantityHorizontal);
        this.eventEmitter.emit('changeValueDistanceHorizontal', this.distanceHorizontal.toFixed(2));
    }

    changeQuantityVertical(value) {
        if (this.quantityVertical === parseInt(value[1].value) && value[3].value >= 0.65) {
            this.quantityVertical = Math.round((value[3].value - 0.65) / 0.465 + 1);
        }
        else {
            this.quantityVertical = parseInt(value[1].value);
        }
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
        let transform = [];
        //rotate & create
        for (let y = 0; y < this.quantityVertical; y++) {
            matrix[y] = [];
            transform[y] = [];
            for (let x = 0; x < this.quantityHorizontal; x++) {
                this.countImage++;
                let element = document.createElement('div');

                element.classList.add('output-image__image');
                // transform[y][x] = 'rotate(0deg)';
                if (this.countImage % 2 === 0) {
                    element.style.transform = 'rotate(45deg)';
                    element.classList.add('output-image__image--reverse');
                    // transform[y][x] = 'rotate(45deg)';
                }

                if (this.quantityHorizontal % 2 === 0 && y % 2 !== 0 && x % 2 === 0) {
                    element.style.transform = 'rotate(45deg)';
                    // transform[y][x] = 'rotate(45deg)';
                }
                else if (this.quantityHorizontal % 2 === 0 && y % 2 !== 0 && x % 2 !== 0) {
                    element.style.transform = 'rotate(0deg)'
                    // transform[y][x] = 'rotate(0deg)';
                }
                matrix[y][x] = element;
            }
        }

        // translate
        for (let y = 0; y < this.quantityVertical; y++) {
            for (let x = 0; x < this.quantityHorizontal; x++) {
                if (x > 0) {
                    // transform[y][x] = `${transform[y][x]} translate(${-25*x}%)` ;
                    // matrix[y][x].style.transform = `translate(${-25*x}%)`
                    matrix[y][x].style.left = `${-25 * x}%`;
                }
                if (y > 0) {
                    matrix[y][x].style.top = `${-25 * y}%`;
                    // transform[y][x] = `${transform[y][x]} translateY(${-25*y}%)` ;
                    // matrix[y][x].style.transform = `translateY(${-25*y}%)`
                }
            }
        }

        // for (let y = 0; y < this.quantityVertical; y++) {
        //     for (let x = 0; x < this.quantityHorizontal; x++) {
        //         if (x > 0) {
        //             matrix[y][x].style.transform = transform[y][x];
        //         }
        //         if (y > 0) {
        //             matrix[y][x].style.transform = transform[y][x];
        //         }
        //     }
        // }


        let doneFragment = document.createDocumentFragment();
        for (let y = 0; y < this.quantityVertical; y++) {
            for (let x = 0; x < this.quantityHorizontal; x++) {
                doneFragment.append(matrix[y][x]);
            }
        }


        this.countImage = 0;

        this.eventEmitter.emit('createImage', {
            x: doneFragment,
            quantityHorizontal: this.quantityHorizontal,
            quantityVertical: this.quantityVertical,
            matrix: matrix
        });
    }


}