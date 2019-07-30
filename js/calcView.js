export class View {
    constructor(controller, model, eventEmitter) {
        this.controller = controller;
        this.eventEmitter = eventEmitter;
        this.containerCalculator = document.querySelector('.container-calculator');
        this.sizeValueHorizontal = document.getElementById('sizeValueHorizontal');
        this.sizeValueVertical = document.getElementById('sizeValueVertical');
        this.quantityValueHorizontal = document.getElementById('quantityValueHorizontal');
        this.quantityValueVertical = document.getElementById('quantityValueVertical');
        this.calculacor = document.querySelector('.calculator');
        this.value = document.body.querySelectorAll('.size-value__text');
        // this.sizeValue = document.querySelectorAll('.size-value');
        // this.quantityValue = document.querySelectorAll('.quantity-value');
        this.outputValue = document.body.querySelectorAll('[data-outputValue]');
        this.calculacor.addEventListener('input', this);


        this.outputImage = document.querySelector('.output-image');


        this.changeDistanceVertical();
        this.changeDistanceHorizontal();
        this.changeQuantityHorizontal();
        this.changeQuantityVertical();
        this.changeOutputValue();

        this.createFieldImage();
    }

    handleEvent() {
        let element = event.target;

        if (element.closest('.size-value')) {
            this.controller.changeOutputValue1(this.value);
        }
        else {
            this.controller.changeOutputValue2(this.value);
        }

    }

    changeDistanceVertical() {
        this.eventEmitter.subscribe('changeValueDistanceVertical', (inputValue) => {
            this.sizeValueVertical.value = inputValue;
        });
    }

    changeDistanceHorizontal() {
        this.eventEmitter.subscribe('changeValueDistanceHorizontal', (inputValue) => {
            this.sizeValueHorizontal.value = inputValue;
        });
    }

    changeQuantityVertical() {
        this.eventEmitter.subscribe('changeQuantityVertical', (inputValue) => {
            this.quantityValueVertical.value = inputValue;
        });
    }

    changeQuantityHorizontal() {
        this.eventEmitter.subscribe('changeQuantityHorizontal', (inputValue) => {
            this.quantityValueHorizontal.value = inputValue;
        });
    }

    changeOutputValue() {
        this.eventEmitter.subscribe('changeOutputValue', (outputValue) => {
            this.outputValue.forEach((el, index) => {
                el.textContent = outputValue[index];
            });
        });
    }

    createFieldImage() {
        this.eventEmitter.subscribe('createImage', (value) => {
            for (let i = 0, length = this.outputImage.childElementCount; i < length; i++) {
                this.outputImage.removeChild(this.outputImage.firstChild);
            }
            this.outputImage.style.gridTemplateColumns = `repeat(${value.quantityHorizontal}, 80px)`;
            this.outputImage.style.gridTemplateRows = `repeat(${value.quantityVertical}, 80px)`;
            this.outputImage.append(value.x);
        });
    }
}