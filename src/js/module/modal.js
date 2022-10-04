'use strict';

 function modalOpen(modalSelector , timerSelector , count = 0) {
     const modal = document.querySelector(modalSelector);
        modal.classList.add('active' , 'fade');
        document.body.style.overflow = 'hidden';
        clearInterval(timerSelector);
        count++;
    }  
    function closeModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.classList.remove('active' , 'fade');
        document.body.style.overflow = '';
    }
function modal(modalSelector , triggerSelector ,  timerSelector ) {
    //Modal
    

    const  modal_open = document.querySelectorAll(triggerSelector) ,
    modal = document.querySelector(modalSelector);

    let count; // for end scroll

   
    modal_open.forEach((element) => {
        element.addEventListener('click' ,() => modalOpen(modalSelector, timerSelector));
    });

  

    modal.addEventListener('click' , (element) => {
        const target = element.target;
        if(target === modal || target.getAttribute('data-close') === '' ) {

            if(target.offsetParent.parentElement.classList.contains('message')) {
                target.offsetParent.parentElement.remove();
                document.querySelector('.modal__dialog').style.cssText = 'display:block';
                clearInterval();
            }
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown' , (e) => {
        if(e.code === 'Escape' && modal.classList.contains('active')){
            closeModal(modalSelector);
        }
    });


    

    function endPage() {
        if(document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight && count < 1) {
            modalOpen(modalSelector, timerSelector);
            document.removeEventListener('scroll' , endPage);
        }
    }
    document.addEventListener('scroll' , endPage);

}

export default modal;
export {modalOpen , closeModal};