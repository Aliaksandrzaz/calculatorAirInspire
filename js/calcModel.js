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
        this.distanceHorizontal = (((this.quantityHorizontal - 1) * 0.465 + 0.65) * 1000) / 1000;

        this.eventEmitter.emit('changeQuantityHorizontal', this.quantityHorizontal);
        this.eventEmitter.emit('changeValueDistanceHorizontal', this.distanceHorizontal.toFixed(3));
    }

    changeQuantityVertical(value) {
        this.quantityVertical = Math.round((value[1].value - 0.65) / 0.465 + 1);
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
        let fragment = new Array(this.quantityVertical * this.quantityHorizontal).fill(null);

        let z = fragment.reduce((acc, el) => {
            if (this.countImage !==0 && this.countImage % this.quantityHorizontal=== 0){
                this.countImage = 0;
            }
            else {
                this.countImage++;
            }
            let element = document.createElement('div');
            let classImage = this.countImage % 2 === 0 ? 'output-image__vertical' : 'output-image__horizontal';
            // element.style.transform = this.countImage % 2 === 0 ? 'rotate(45deg)' : 'rotate(0deg)';
            // element.style.transform = `translate(${-10}px, ${-10}px)`;

            element.classList.add(classImage);
            acc.append(element);

            // if (this.countImage !==0 && this.countImage % this.quantityHorizontal=== 0){
            //     this.countImage = 0;
            // }
            // else {
            //     this.countImage++;
            // }
            return acc;
        }, document.createDocumentFragment());

        this.countImage =0;

        this.eventEmitter.emit('createImage', {
            // element: element,
            x: z,
            quantityHorizontal: this.quantityHorizontal,
            quantityVertical: this.quantityVertical
        });
    }

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