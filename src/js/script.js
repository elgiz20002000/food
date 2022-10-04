
"use strict";   
 import  tabs from  './module/tabs';
 import  modal from  './module/modal';
 import  menu from  './module/menu';
 import  post from  './module/post';
 import  timer from  './module/timer';
 import  calc from  './module/calc';
 import  slider from  './module/slider';
 import {modalOpen} from './module/modal' ;

window.addEventListener('DOMContentLoaded' , () => {

        const timerSelector = setTimeout( () => modalOpen('.modal'  , timerSelector) , 5000);

        tabs(".tabheader__items" , ".tabheader__item" , '.tabcontent');
        modal('.modal' , '[data-modal]' ,timerSelector);
        menu();
        post('form' , timerSelector);
        timer('2022-11-29' , ".timer");
        calc();
        slider({
                sliderCounter:'.offer__slider-counter',
                prevSlide:'.offer__slider-prev',
                nextSlide:'.offer__slider-next',
                container:'.offer__slider',
                currentCount:'#current',
                slide:'.offer__slide',
                totalCount:'#total',
                sliderWrapper:'.offer__slider-wrapper',
                sliderFields:'.offer__slider-inner'
        });

});