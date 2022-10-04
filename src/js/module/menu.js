'use strict';

function menu() {
     //menu
     class Menu {
        constructor(img ,imgName , title , text , price , parent , ...classes) {
            
            this.img = img;
            this.imgName = imgName;
            this.title = title;
            this.text = text;
            this.price = price;
            this.parentElement = document.querySelector(parent);
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

 

        axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img , altimg , title , descr , price}) => {
            new Menu(img , altimg , title , descr , price * 21 , '.menu .container').structurization();
            });
        });
}

export default menu;