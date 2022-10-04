/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/module/calc.js":
/*!*******************************!*\
  !*** ./src/js/module/calc.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


function calc() {
  //Calc
  const result = document.querySelector('.calculating__result span'),
        gender = document.querySelectorAll('[data-gender]'),
        activityField = document.querySelectorAll('[data-activity]'),
        inputs = document.querySelectorAll('.calculating__choose input');
  let sex, height, weight, age, activity;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex);
  }

  if (localStorage.getItem('activity')) {
    activity = localStorage.getItem('activity');
  } else {
    activity = '1.375';
    localStorage.setItem('activity', activity);
  }

  function initStorage() {
    for (var _len = arguments.length, selectors = new Array(_len), _key = 0; _key < _len; _key++) {
      selectors[_key] = arguments[_key];
    }

    selectors.forEach(selector => {
      selector.forEach(item => {
        item.classList.remove('calculating__choose-item_active');

        if (item.getAttribute('data-gender') == localStorage.getItem('sex')) {
          item.classList.add('calculating__choose-item_active');
        }

        if (item.getAttribute('data-activity') == localStorage.getItem('activity')) {
          item.classList.add('calculating__choose-item_active');
        }
      });
    });
  }

  initStorage(gender, activityField);

  function getResult() {
    if (!sex || !height || !weight || !age || !activity) {
      result.textContent = "____";
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
    }
  }

  function infoAnalyse(item) {
    if (item.hasAttribute('data-gender')) {
      sex = item.getAttribute('data-gender');
      localStorage.setItem('sex', sex);
    } else if (item.hasAttributes('data-activity')) {
      activity = +item.getAttribute('data-activity');
      localStorage.setItem('activity', activity);
    }

    getResult();
  }

  function tabTooggle() {
    for (var _len2 = arguments.length, value = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      value[_key2] = arguments[_key2];
    }

    value.forEach(content => {
      content.forEach(item => {
        item.addEventListener('click', () => {
          infoAnalyse(item);
          content.forEach(item => item.classList.remove('calculating__choose-item_active'));
          item.classList.add('calculating__choose-item_active');
        });
      });
    });
  }

  inputs.forEach(item => {
    item.addEventListener('input', () => {
      if (item.value.match(/\D/)) {
        item.style.border = "2px solid red";
      } else {
        item.style.border = "none";
      }

      if (item.id === 'height') {
        height = +item.value;
      } else if (item.id === 'weight') {
        weight = +item.value;
      } else if (item.id === 'age') {
        age = +item.value;
      }

      getResult();
    });
  });
  getResult();
  tabTooggle(gender, activityField);
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./src/js/module/menu.js":
/*!*******************************!*\
  !*** ./src/js/module/menu.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


function menu() {
  //menu
  class Menu {
    constructor(img, imgName, title, text, price, parent) {
      this.img = img;
      this.imgName = imgName;
      this.title = title;
      this.text = text;
      this.price = price;
      this.parentElement = document.querySelector(parent);

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
    }

    structurization() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.img} alt=${this.imgName}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
      this.parentElement.append(element);
    }

  }

  axios.get('http://localhost:3000/menu').then(data => {
    data.data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new Menu(img, altimg, title, descr, price * 21, '.menu .container').structurization();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (menu);

/***/ }),

/***/ "./src/js/module/modal.js":
/*!********************************!*\
  !*** ./src/js/module/modal.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalOpen": function() { return /* binding */ modalOpen; },
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; }
/* harmony export */ });


function modalOpen(modalSelector, timerSelector) {
  let count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  const modal = document.querySelector(modalSelector);
  modal.classList.add('active', 'fade');
  document.body.style.overflow = 'hidden';
  clearInterval(timerSelector);
  count++;
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('active', 'fade');
  document.body.style.overflow = '';
}

function modal(modalSelector, triggerSelector, timerSelector) {
  //Modal
  const modal_open = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
  let count; // for end scroll

  modal_open.forEach(element => {
    element.addEventListener('click', () => modalOpen(modalSelector, timerSelector));
  });
  modal.addEventListener('click', element => {
    const target = element.target;

    if (target === modal || target.getAttribute('data-close') === '') {
      if (target.offsetParent.parentElement.classList.contains('message')) {
        target.offsetParent.parentElement.remove();
        document.querySelector('.modal__dialog').style.cssText = 'display:block';
        clearInterval();
      }

      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('active')) {
      closeModal(modalSelector);
    }
  });

  function endPage() {
    if (document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight && count < 1) {
      modalOpen(modalSelector, timerSelector);
      document.removeEventListener('scroll', endPage);
    }
  }

  document.addEventListener('scroll', endPage);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./src/js/module/post.js":
/*!*******************************!*\
  !*** ./src/js/module/post.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/module/modal.js");




function post(formSelector, timerSelector) {
  //post 
  const forms = document.querySelectorAll(formSelector),
        form_message = {
    loading: 'img/form/spinner.svg',
    success: "Done",
    failure: 'Error'
  };

  function postFormData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const message_element = document.createElement('img');
      message_element.src = form_message.loading;
      message_element.style.cssText = "display:block; margin: 10px auto 0";
      form.after(message_element);
      const form_data = new FormData(form);
      const data = Object.fromEntries(form_data.entries());
      axios.post('http://localhost:3000/requests', data).then(data => {
        console.log(data.data);
        message__modal(form_message.success);
        message_element.remove();
      }).catch(() => {
        message__modal(form_message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  forms.forEach(item => {
    postFormData(item);
  });

  function message__modal(message) {
    const currentModal = document.querySelector('.modal__dialog');
    currentModal.style.cssText = 'display:none';
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalOpen)('.modal', timerSelector);
    const modalMessage = document.createElement('div');
    modalMessage.classList.add('modal__dialog', 'message');
    modalMessage.innerHTML = `
        <div class="modal__content">

            <div data-close="" class="modal__close">×</div>
            <div class="modal__title">${message}</div>
       
        </div>
        `;
    document.querySelector('.modal').append(modalMessage);
    setTimeout(() => {
      modalMessage.remove();
      currentModal.style.cssText = 'display:block';
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (post);

/***/ }),

/***/ "./src/js/module/slider.js":
/*!*********************************!*\
  !*** ./src/js/module/slider.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


function slider(_ref) {
  let {
    sliderCounter,
    currentCount,
    totalCount,
    slide,
    sliderFields,
    sliderWrapper,
    nextSlide,
    prevSlide
  } = _ref;
  //slider
  const slider_counter = document.querySelector(sliderCounter),
        prev = slider_counter.querySelector(prevSlide),
        next = slider_counter.querySelector(nextSlide),
        current_count = slider_counter.querySelector(currentCount),
        slides = document.querySelectorAll(slide),
        total_count = document.querySelector(totalCount),
        wrapper = document.querySelector(sliderWrapper),
        width = window.getComputedStyle(wrapper).width,
        wrapper_inner = document.querySelector(sliderFields);

  function currentCountText() {
    if (counter < 1) {
      counter = slides.length;
    }

    if (counter > slides.length) {
      counter = 1;
    }

    if (counter >= 1 && counter <= 9) {
      current_count.textContent = `0${counter}`;
    } else {
      current_count.textContent = `${counter}`;
    }
  }

  function toDigits(str) {
    return +str.replace(/\D/g, '');
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

  let counter = 1,
      move = 0;
  current_count.textContent = `0${counter}`; //slider_dots

  const slider = document.createElement('ol'),
        dots = [];
  slider.classList.add('carousel-indicators');

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-index', i + 1);
    slider.append(dot);

    if (i === 0) {
      dot.classList.add('dot_active');
    }

    dots.push(dot);
    document.querySelector('.offer__slider').append(slider);
  }

  slider.addEventListener('click', e => {
    const target = e.target;
    dots.forEach(dot => dot.classList.remove('dot_active'));

    if (target.classList.contains('dot')) {
      target.classList.add('dot_active');
      counter = target.getAttribute('data-index');
      currentCountText();
      move = toDigits(width) * (counter - 1);
      wrapper_inner.style.transform = `translateX(-${move}px)`;
    }
  }); //slider_dots

  slider_counter.addEventListener('click', e => {
    const target = e.target;

    if (target.classList.contains(prev.getAttribute('class'))) {
      if (move === 0) {
        move = toDigits(width) * (slides.length - 1);
      } else {
        move -= toDigits(width);
      }

      counter--;
      currentCountText();
    } else if (target.classList.contains(next.getAttribute('class'))) {
      if (move === toDigits(width) * (slides.length - 1)) {
        move = 0;
      } else {
        move += toDigits(width);
      }

      counter++;
      currentCountText();
    }

    wrapper_inner.style.transform = `translateX(-${move}px)`;
    dots.forEach(dot => dot.classList.remove('dot_active'));
    dots[counter - 1].classList.add('dot_active');
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./src/js/module/tabs.js":
/*!*******************************!*\
  !*** ./src/js/module/tabs.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


function tabs(tabsSelector, tabSelector, contentSelector) {
  let tabs = document.querySelector(tabsSelector),
      tab = document.querySelectorAll(tabSelector),
      content = document.querySelectorAll(contentSelector);

  function insert(i) {
    content[i].classList.add('active', 'fade');
    tab[i].classList.add('tabheader__item_active');
  }

  function deleteContent() {
    content.forEach(value => {
      value.classList.remove('active', 'fade');
    });
    tab.forEach(value => {
      value.classList.remove('tabheader__item_active');
    });
  }

  tabs.addEventListener('click', event => {
    let target = event.target;

    if (target.classList.contains("tabheader__item") && target) {
      tab.forEach((value, i) => {
        if (target == value) {
          deleteContent();
          insert(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./src/js/module/timer.js":
/*!********************************!*\
  !*** ./src/js/module/timer.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);


function timer(timeLimiteValue, timerSelector) {
  // Timer
  function timeCalc(time) {
    const t = Date.parse(time) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 * 60) % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function setTime(selector, time) {
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateTime, 1000);
    updateTime();

    function zero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    function updateTime() {
      const total = timeCalc(time);
      days.innerHTML = zero(total.days);
      hours.innerHTML = zero(total.hours);
      minutes.innerHTML = zero(total.minutes);
      seconds.innerHTML = zero(total.seconds);

      if (total.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setTime(timerSelector, timeLimiteValue);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/tabs */ "./src/js/module/tabs.js");
/* harmony import */ var _module_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./module/modal */ "./src/js/module/modal.js");
/* harmony import */ var _module_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./module/menu */ "./src/js/module/menu.js");
/* harmony import */ var _module_post__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./module/post */ "./src/js/module/post.js");
/* harmony import */ var _module_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module/timer */ "./src/js/module/timer.js");
/* harmony import */ var _module_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module/calc */ "./src/js/module/calc.js");
/* harmony import */ var _module_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./module/slider */ "./src/js/module/slider.js");










window.addEventListener('DOMContentLoaded', () => {
  const timerSelector = setTimeout(() => (0,_module_modal__WEBPACK_IMPORTED_MODULE_1__.modalOpen)('.modal', timerSelector), 5000);
  (0,_module_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__items", ".tabheader__item", '.tabcontent');
  (0,_module_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-modal]', timerSelector);
  (0,_module_menu__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_module_post__WEBPACK_IMPORTED_MODULE_3__["default"])('form', timerSelector);
  (0,_module_timer__WEBPACK_IMPORTED_MODULE_4__["default"])('2022-11-29', ".timer");
  (0,_module_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_module_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
    sliderCounter: '.offer__slider-counter',
    prevSlide: '.offer__slider-prev',
    nextSlide: '.offer__slider-next',
    container: '.offer__slider',
    currentCount: '#current',
    slide: '.offer__slide',
    totalCount: '#total',
    sliderWrapper: '.offer__slider-wrapper',
    sliderFields: '.offer__slider-inner'
  });
});
}();
/******/ })()
;
//# sourceMappingURL=total.js.map