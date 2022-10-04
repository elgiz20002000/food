'use strict';

function slider({sliderCounter , currentCount , totalCount , slide , sliderFields , sliderWrapper , nextSlide , prevSlide }) {
      //slider

      const slider_counter = document.querySelector(sliderCounter),
      prev = slider_counter.querySelector(prevSlide) ,
      next = slider_counter.querySelector(nextSlide) ,
      current_count = slider_counter.querySelector(currentCount) ,
      slides = document.querySelectorAll(slide) ,
      total_count = document.querySelector(totalCount), 
      wrapper = document.querySelector(sliderWrapper),
      width = window.getComputedStyle(wrapper).width ,
      wrapper_inner = document.querySelector(sliderFields);
  
      function currentCountText() {
          if(counter < 1){
              counter = slides.length;
          }
          if(counter > slides.length){
              counter = 1;
          }
  
          if(counter >= 1 && counter <= 9){
              current_count.textContent = `0${counter}`;
          } else{
              current_count.textContent = `${counter}`;
          }
      }
  
      function toDigits(str) {
          return +str.replace(/\D/g , '');
      }
  
      wrapper_inner.style.width = 100 * slides.length + "%";
  
      slides.forEach(slide => {
          slide.style.width = width;
      });
  
      if (slides.length < 10) {
          total_count.textContent = `0${slides.length}`;
      } else {
          total_count.textContent = slides.length;
      }
  
      let counter = 1 ,
      move = 0;
      current_count.textContent = `0${counter}`; 
  
      //slider_dots
  
      const slider =document.createElement('ol') ,
      dots = [];
   
           slider.classList.add('carousel-indicators');
  
           for (let i = 0 ; i < slides.length; i++) {
               const dot = document.createElement('li');
               dot.classList.add('dot');
               dot.setAttribute('data-index' , i + 1);
               slider.append(dot);
  
               if(i === 0) {
                   dot.classList.add('dot_active');
               }
               dots.push(dot);
               document.querySelector('.offer__slider').append(slider);
       }
  
       slider.addEventListener('click' , (e) => {
  
          const target = e.target;
  
          dots.forEach(dot => dot.classList.remove('dot_active'));
  
          if(target.classList.contains('dot')){
              
              target.classList.add('dot_active');
              counter = target.getAttribute('data-index');
              currentCountText();
              move = toDigits(width) * (counter - 1);
              wrapper_inner.style.transform = `translateX(-${move}px)`;
          }
       });
          
  
        //slider_dots
   
      slider_counter.addEventListener('click' , (e) => {
          const target = e.target;
  
          if(target.classList.contains(prev.getAttribute('class'))){
  
              if(move === 0) {
                  move = toDigits(width)  * (slides.length - 1);
              } else {
                  move -= toDigits(width) ;
              }
              counter--;
              currentCountText();
  
          } else if(target.classList.contains(next.getAttribute('class'))) {
              if(move === toDigits(width)  * (slides.length - 1)) {
                  move = 0;
              } else {
                   move += toDigits(width) ;
              }
              counter++;
              currentCountText();
          }
          
          wrapper_inner.style.transform = `translateX(-${move}px)`;
          dots.forEach(dot => dot.classList.remove('dot_active'));
          dots[counter - 1].classList.add('dot_active');
      });
}

export default slider;