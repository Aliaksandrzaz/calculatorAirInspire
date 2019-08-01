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
        this.controller.createFieldImage();
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
                this.outputImage.children.item(0).remove();
            }
            let size = 0;
            let count = 0;

            let x = parseFloat(getComputedStyle(this.outputImage).width);
            let y = parseFloat(getComputedStyle(this.outputImage).height);

            let row = x / value.quantityHorizontal;
            let column = y / value.quantityVertical;

            if (row > column) {

                size = column;
            }
            else {
                size = row;
            }

            this.outputImage.style.gridTemplateColumns = `repeat(${value.quantityHorizontal}, ${size }px)`;
            this.outputImage.style.gridTemplateRows = `repeat(${value.quantityVertical}, ${size }px)`;

            this.outputImage.append(value.x);



            let biasX = -parseFloat(getComputedStyle(this.outputImage.lastChild).left) / 2,
                biasY = -parseFloat(getComputedStyle(this.outputImage.lastChild).top) / 2;
            this.outputImage.style.transform = `translate(${biasX}px ,${biasY}px)`;

            let width = (((size) * value.quantityHorizontal) - parseFloat(getComputedStyle(this.outputImageWidth).width)) / 2 - 10 - biasX;
            document.body.getElementsByClassName('output-image__line-width')[0].style.width = `${width}px`;
            document.body.getElementsByClassName('output-image__line-width')[1].style.width = `${width}px`;

            let height = ((parseFloat(getComputedStyle(this.outputImage.firstElementChild).height)) * value.quantityVertical) / 2 - 31.2 / 2 -  biasY ;
            document.body.getElementsByClassName('output-image__line-height')[0].style.height = `${height}px`;
            document.body.getElementsByClassName('output-image__line-height')[1].style.height = `${height}px`;

        });
    }
}
