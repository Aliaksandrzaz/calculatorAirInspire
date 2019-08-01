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
        this.eventEmitter.emit('changeValueDistanceHorizontal', this.distanceHorizontal.toFixed(3));

    }

    changeDistanceVertical(value) {
        if (this.regQuantity.test(value[1].value)) {
            this.quantityVertical = parseInt(value[1].value);
        }
        this.distanceVertical = (((this.quantityVertical - 1) * 0.465 + 0.65) * 1000) / 1000;
        this.eventEmitter.emit('changeValueDistanceVertical', this.distanceVertical.toFixed(3));
        this.eventEmitter.emit('changeQuantityVertical', this.quantityVertical);
    }

    changeQuantityHorizontal(value) {

        this.quantityHorizontal = Math.round((value[2].value - 0.65) / 0.465 + 1);
        this.distanceHorizontal = (((this.quantityHorizontal - 1) * 0.465 + 0.65) * 1000) / 1000;

        this.eventEmitter.emit('changeQuantityHorizontal', this.quantityHorizontal);
        this.eventEmitter.emit('changeValueDistanceHorizontal', this.distanceHorizontal.toFixed(3));
    }

    changeQuantityVertical(value) {
        this.quantityVertical = Math.round((value[3].value - 0.65) / 0.465 + 1);
        this.distanceVertical = (((this.quantityVertical - 1) * 0.465 + 0.65) * 1000) / 1000;

        this.eventEmitter.emit('changeValueDistanceVertical', this.distanceVertical.toFixed(3));
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
        let matrix = [];

        //rotate & create
        for (let y = 0; y < this.quantityVertical; y++) {
            matrix[y] = [];
            for (let x = 0; x < this.quantityHorizontal; x++) {
                this.countImage++;
                let element = document.createElement('div');

                // element.style.transform = 'translate(25%) rotate(0deg)';

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

    // createImage() {
    //     let fragment = new Array(this.quantityVertical * this.quantityHorizontal).fill(null);
    //
    //     let z = fragment.reduce((acc, el) => {
    //         this.countImage++;
    //         let element = document.createElement('div');
    //         let classImage = this.countImage % 2 === 0 ? 'output-image__vertical' : 'output-image__horizontal';
    //         element.classList.add(classImage);
    //         acc.push(element);
    //         return acc;
    //     }, []);
    //
    //     this.countImage = 0;
    //
    //     if (this.quantityHorizontal % 2 === 0) {
    //         for (let i = 0; i < z.length; i++) {
    //             if (i % 2 !== 0) {
    //                 z[i].style.transform = 'rotate(45deg)';
    //             }
    //         }
    //     }
    //     else {
    //         for (let i = 0; i < z.length; i++) {
    //             if (i % 2 === 0) {
    //                 z[i].style.transform = 'rotate(45deg)';
    //             }
    //         }
    //     }
    //
    //     // let countRotate = 1 + this.quantityHorizontal;
    //     //
    //     // for (let i = 0; i < z.length; i++) {
    //     //     this.countImage++;
    //     //     if (countRotate === this.quantityHorizontal+1) {
    //     //         for (let j = 0; j < this.quantityHorizontal; j++) {
    //     //             z[i].style.transform = this.countImage % 2 === 0 ? 'rotate(45deg)' : 'rotate(0deg)';
    //     //         }
    //     //         countRotate = countRotate + this.quantityHorizontal;
    //     //     }
    //     //     else {
    //     //         for (let j = 0; j < this.quantityHorizontal; j++) {
    //     //             z[i].style.transform = this.countImage % 2 === 0 ? 'rotate(0deg)' : 'rotate(45deg)';
    //     //         }
    //     //     }
    //     // }
    //
    //     let doneFragment = z.reduce((acc, el) => {
    //         acc.append(el);
    //         return acc;
    //     }, document.createDocumentFragment());
    //
    //
    //     this.countImage = 0;
    //
    //     this.eventEmitter.emit('createImage', {
    //         // element: element,
    //         x: doneFragment,
    //         quantityHorizontal: this.quantityHorizontal,
    //         quantityVertical: this.quantityVertical
    //     });
    // }
    //
    // createImage() {
    //     let fragment = new Array(this.quantityVertical).fill(null);
    //
    //     let z = fragment.reduce((acc, el) => {
    //         let row = document.createElement('div');
    //         row.classList.add('x');
    //         for (let i = 0; i < this.quantityHorizontal; i++) {
    //             let column = document.createElement('div');
    //             let classImage = this.countImage % 2 === 0 ? 'output-image__vertical' : 'output-image__horizontal';
    //             column.classList.add(classImage);
    //             row.append(column);
    //             this.countImage++;
    //         }
    //         acc.append(row);
    //         return acc;
    //     }, document.createDocumentFragment());
    //
    //     this.eventEmitter.emit('createImage', {
    //         // element: element,
    //         x: z,
    //         quantityHorizontal: this.quantityHorizontal,
    //         quantityVertical: this.quantityVertical
    //     });
    // }


}