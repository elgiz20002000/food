'use strict';

function calc() {
     //Calc

     const result = document.querySelector('.calculating__result span') ,
     gender = document.querySelectorAll('[data-gender]'),
     activityField = document.querySelectorAll('[data-activity]') ,
     inputs = document.querySelectorAll('.calculating__choose input');
     
     let sex, 
     height, weight, age,
     activity ;
 
     if(localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
     } else  {
         sex = 'female';
         localStorage.setItem('sex' , sex);
     }
 
     if(localStorage.getItem('activity')) {
         activity = localStorage.getItem('activity');
     } else  {
         activity = '1.375';
         localStorage.setItem('activity' , activity);
     }
 
     function initStorage(...selectors) {
         selectors.forEach(selector => {
             selector.forEach(item => {
                 item.classList.remove('calculating__choose-item_active');
                 if(item.getAttribute('data-gender') == localStorage.getItem('sex')) {
                     item.classList.add('calculating__choose-item_active');
                 }
                 if(item.getAttribute('data-activity') == localStorage.getItem('activity')) {
                     item.classList.add('calculating__choose-item_active');
                 }
             });
         });
     }   
 
     initStorage(gender , activityField);
 
 
 
     function getResult() {
         if( !sex || !height || !weight || !age || !activity ) {
             result.textContent = "____";
             return;
         }
 
         if(sex === 'female') {
             result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
         } else {
             result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity) ;
         }
     }
 
     function infoAnalyse(item) {
         if(item.hasAttribute('data-gender')) {
             sex = item.getAttribute('data-gender');
             localStorage.setItem('sex' , sex);
         } else if (item.hasAttributes('data-activity')) {
             activity = +item.getAttribute('data-activity');
             localStorage.setItem('activity' , activity);
         }
         getResult();
     }
 
     function tabTooggle(...value) {
         value.forEach((content) => {
             content.forEach(item => {
                 item.addEventListener('click' , () => {
                     infoAnalyse(item);
                     content.forEach(item => item.classList.remove('calculating__choose-item_active'));
                     item.classList.add('calculating__choose-item_active');
                 });
             });
         });
     }
 
     inputs.forEach(item => {
         item.addEventListener('input' , () => {
             if(item.value.match(/\D/)) {
                 item.style.border = "2px solid red";
             } else {
                 item.style.border = "none";
             }
 
             if(item.id === 'height'){
                 height = +item.value;
             } else if(item.id === 'weight') {
                 weight = +item.value;
             } else if(item.id === 'age') {
                 age = +item.value;
             }
             getResult();
         });
     }); 
 
     getResult();
     tabTooggle(gender , activityField); 
}

export default calc;