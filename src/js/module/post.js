'use strict';
import {modalOpen ,closeModal} from './modal' ;

function post(formSelector , timerSelector) {
    //post 

    const forms = document.querySelectorAll(formSelector),
    form_message = {
        loading:'img/form/spinner.svg',
        success:"Done",
        failure:'Error'
    };


    function postFormData(form) {
        form.addEventListener('submit' , (e) => {
            e.preventDefault();
   

            const message_element = document.createElement('img');
            message_element.src = form_message.loading;
            message_element.style.cssText = "display:block; margin: 10px auto 0";
            form.after(message_element);

            

            const form_data = new FormData(form);
            const data = Object.fromEntries((form_data.entries()));

         

          
            axios.post('http://localhost:3000/requests' , data)
                 .then((data) => {
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

    forms.forEach((item) => {
        postFormData(item);
    });

    function message__modal(message) {
        const currentModal = document.querySelector('.modal__dialog');
        currentModal.style.cssText = 'display:none';

        modalOpen('.modal' , timerSelector);
        const modalMessage = document.createElement('div');
        modalMessage.classList.add('modal__dialog' , 'message');
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
            closeModal('.modal');
        } , 4000);
    }
}
   export default post;
