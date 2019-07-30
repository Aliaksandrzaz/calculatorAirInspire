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
        this.outputImageHeight = document.querySelector('.output-image__height');
        this.outputImageWidth = document.querySelector('.output-image__width');
        this.calculacor.addEventListener('change', this);


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
            this.outputImageWidth.textContent = `${inputValue}м`;
        });
    }

    changeDistanceHorizontal() {
        this.eventEmitter.subscribe('changeValueDistanceHorizontal', (inputValue) => {
            this.sizeValueHorizontal.value = inputValue;
            this.outputImageHeight.textContent = `${inputValue}м`;
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
                // this.outputImage.removeChild(this.outputImage.firstChild);
                this.outputImage.children.item(0).remove();
            }
            let size = getComputedStyle(this.outputImage).width <= getComputedStyle(this.outputImage).height ? parseInt(getComputedStyle(this.outputImage).width) : parseInt(getComputedStyle(this.outputImage).height);
            let count = value.quantityHorizontal >= value.quantityVertical ? value.quantityHorizontal : value.quantityVertical;
            this.outputImage.style.gridTemplateColumns = `repeat(${value.quantityHorizontal}, ${size / count}px)`;
            this.outputImage.style.gridTemplateRows = `repeat(${value.quantityVertical}, ${size / count}px)`;

            // this.outputImage.style.gridTemplateColumns = `repeat(${value.quantityHorizontal}, ${100 / value.quantityHorizontal}%)`;
            // this.outputImage.style.gridTemplateRows = `repeat(${value.quantityVertical}, ${100 / value.quantityVertical}%)`;
            this.outputImage.append(value.x);
        });
    }
}