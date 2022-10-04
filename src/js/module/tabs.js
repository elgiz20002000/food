'use strict';
function tabs(tabsSelector , tabSelector , contentSelector) {
    let tabs = document.querySelector(tabsSelector), 
    tab = document.querySelectorAll(tabSelector) ,
    content = document.querySelectorAll(contentSelector);
   
    function insert(i) {
        content[i].classList.add('active' , 'fade');
        tab[i].classList.add('tabheader__item_active');
    }
   
    function deleteContent() {
        content.forEach(value => {
            value.classList.remove('active' , 'fade');  
        });
   
        tab.forEach(value => {
            value.classList.remove('tabheader__item_active');  
        });
    }   
   
   
    tabs.addEventListener('click' , (event) => {
        let target = event.target;
        if(target.classList.contains("tabheader__item") && target){
   
            tab.forEach((value , i) => {
                if(target == value){
                   deleteContent();
                   insert(i);
                }
            });
        }
    });
}


export default tabs;