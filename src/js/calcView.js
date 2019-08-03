export class View {
    constructor(controller, model, eventEmitter) {
        this.controller = controller;
        this.eventEmitter = eventEmitter;
        this.sizeValueHorizontal = document.getElementById('sizeValueHorizontal');
        this.sizeValueVertical = document.getElementById('sizeValueVertical');
        this.quantityValueHorizontal = document.getElementById('quantityValueHorizontal');
        this.quantityValueVertical = document.getElementById('quantityValueVertical');
        this.calculacor = document.querySelector('.calculator');
        this.value = document.body.querySelectorAll('.size-value__text');
        this.outputValue = document.body.querySelectorAll('[data-outputValue]');
        this.outputImageHeight = document.querySelector('.output-image__height');
        this.outputImageWidth = document.querySelector('.output-image__width');
        this.calculacor.addEventListener('change', this);
        this.calculacor.addEventListener('click', this);
        this.outputImage = document.querySelector('.output-image');
        this.containerLineHeight = document.querySelector('.container-line-height');
        this.containerLineWidth = document.querySelector('.container-line-width');

        this.btnMinusSizeValueHorizontal = document.getElementById('btnMinusSizeValueHorizontal');
        this.btnPlusSizeValueHorizontal = document.getElementById('btnPlusSizeValueHorizontal');
        this.btnMinusSizeValueVertical = document.getElementById('btnMinusSizeValueVertical');
        this.btnPlusSizeValueVertical = document.getElementById('btnPlusSizeValueVertical');

        this.btnMinusQuantityValueHorizontal = document.getElementById('btnMinusQuantityValueHorizontal');
        this.btnPlusQuantityValueHorizontal = document.getElementById('btnPlusQuantityValueHorizontal');
        this.btnMinusQuantityValueVertical = document.getElementById('btnMinusQuantityValueVertical');
        this.btnPlusQuantityValueVertical = document.getElementById('btnPlusQuantityValueVertical');

        this.changeDistanceVertical();
        this.changeDistanceHorizontal();
        this.changeQuantityHorizontal();
        this.changeQuantityVertical();
        this.changeOutputValue();
        this.createFieldImage();

        this.controller.createFieldImage();
    }

    handleEvent() {
        // this.value=[quantityValueHorizontal, quantityValueVertical, sizeValueHorizontal, sizeValueVertical]
        let element = event.target;

        let oldValueFlag = 0;

        if (element === this.btnMinusSizeValueHorizontal && this.value[0].value - 1 >= 1 && this.value[0].value > 0.65) {
            --this.value[0].value;
            oldValueFlag++;
        }
        else if (element === this.btnPlusSizeValueHorizontal) {
            this.value[0].value++;
            oldValueFlag++;
        }
        else if (element === this.btnMinusSizeValueVertical && this.value[1].value - 1 >= 1 && this.value[3].value > 0.65) {
            --this.value[1].value;
            oldValueFlag++;
        }
        else if (element === this.btnPlusSizeValueVertical) {
            this.value[1].value++;
            oldValueFlag++;
        }

        else if (element === this.btnMinusQuantityValueHorizontal && this.value[0].value - 1 >= 1) {
            --this.value[0].value;
            oldValueFlag++;
        }
        else if (element === this.btnPlusQuantityValueHorizontal) {
            this.value[0].value++;
            oldValueFlag++;
        }
        else if (element === this.btnMinusQuantityValueVertical && this.value[1].value - 1 >= 1) {
            --this.value[1].value;
            oldValueFlag++;
        }
        else if (element === this.btnPlusQuantityValueVertical) {
            this.value[1].value++;
            oldValueFlag++;
        }

        if ((element.closest('.size-value') && event.type === 'change') || oldValueFlag === 1) {
            this.controller.changeOutputValue2(this.value);
        }
        else if ((element.closest('.quantity-value') && event.type === 'change')  || oldValueFlag ===1) {
            this.controller.changeOutputValue1(this.value);
        }

    }

    changeDistanceVertical() {
        this.eventEmitter.subscribe('changeValueDistanceVertical', (inputValue) => {
            this.sizeValueVertical.value = inputValue;
            this.outputImageHeight.textContent = `${inputValue.split('.').join(',')}м`;
        });
    }

    changeDistanceHorizontal() {
        this.eventEmitter.subscribe('changeValueDistanceHorizontal', (inputValue) => {
            this.sizeValueHorizontal.value = inputValue;
            this.outputImageWidth.textContent = `${inputValue.split('.').join(',')}м`;
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

    removeAnimationOutputValue() {
        this.outputValue.forEach((el) => {
            el.classList.remove('animationChangeOutputValueText')
        })
    }

    animationOutputValue() {
        this.outputValue.forEach((el) => {
            el.classList.add('animationChangeOutputValueText')
        })
    }


    createFieldImage() {
        this.eventEmitter.subscribe('createImage', (value) => {
            for (let i = 0, length = this.outputImage.childElementCount; i < length; i++) {
                this.outputImage.children.item(0).remove();
            }

            this.removeAnimationOutputValue();
            this.containerLineHeight.style.left = `0px`;
            this.containerLineWidth.style.top = `0px`;
            this.outputImage.textContent = '';

            if (value.quantityHorizontal * value.quantityVertical <= 50) {
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

                let height = ((parseFloat(getComputedStyle(this.outputImage.firstElementChild).height)) * value.quantityVertical) / 2 - 31.2 / 2 - biasY;
                document.body.getElementsByClassName('output-image__line-height')[0].style.height = `${height}px`;
                document.body.getElementsByClassName('output-image__line-height')[1].style.height = `${height}px`;

                this.animationOutputValue();

                let containerLineHeightLeft = x/2 - value.quantityHorizontal * column + biasX;
                if (containerLineHeightLeft > 0){
                    this.containerLineHeight.style.left = `${containerLineHeightLeft}px`;
                }

                let containerLineWidthTop = y/2 - value.quantityVertical * row + biasY;
                if (containerLineWidthTop > 0){
                    this.containerLineWidth.style.top = `${containerLineWidthTop}px`;
                }

            }
            else {
                this.outputImage.style.transform = `translate(${0}px ,${0}px)`;
                this.outputImage.style.gridTemplateColumns = `1fr`;
                this.outputImage.style.gridTemplateRows = `0.5fr`;
                this.outputImage.textContent = `Максимально доступное количество устройств к визуализации 50 шт. Если
                    Вас интересует видеостена больше, чем из 50 устройств, пожалуйста, свяжитесь с менеджером компании.`
            }
        });
    }
}
