import {fadeIn, fadeOut} from "./fade.js";

'fade.js';

function changeQuantityValue() {
    let arrowMinus = document.getElementById('js-firstscreen-form-decrease'),
        arrowPlus = document.getElementById('js-firstscreen-form-increase'),
        quantity = document.getElementById('js-firstscreen-form-number');

    arrowMinus.addEventListener('click', () => {
        if (quantity.value > 1) {
            quantity.value--
        }
    });

    arrowPlus.addEventListener('click', () => {
        quantity.value++
    });
}

function changeFirstScreenImages() {
    let firstImageTrigger = document.querySelector('.firstscreen__slider-selectors p:nth-child(1)'),
        secondImageTrigger = document.querySelector('.firstscreen__slider-selectors p:nth-child(2)'),
        thirdImageTrigger = document.querySelector('.firstscreen__slider-selectors p:nth-child(3)');


    function deactivateImage(imageNumber) {
        document.querySelector(`.firstscreen__slider-images img:nth-child(${imageNumber})`).style.display="none";
        document.querySelector(`.firstscreen__slider-selectors p:nth-child(${imageNumber})`).classList.remove('active');
    }

    function activateImage(imageNumber) {
        fadeIn(document.querySelector(`.firstscreen__slider-images img:nth-child(${imageNumber})`));
        document.querySelector(`.firstscreen__slider-selectors p:nth-child(${imageNumber})`).classList.add('active');
    }


    firstImageTrigger.addEventListener('click', () => {
        deactivateImage('2');
        deactivateImage('3');
        activateImage('1');
    });

    secondImageTrigger.addEventListener('click', () => {
        deactivateImage('1');
        deactivateImage('3');
        activateImage('2');
    });

    thirdImageTrigger.addEventListener('click', () => {
        deactivateImage('1');
        deactivateImage('2');
        activateImage('3');
    })
}

changeQuantityValue();
changeFirstScreenImages();

