export default class Modal {
    constructor(parentEl) {
        this.parentEl = parentEl;
    }

    static get markup() {
        return `
        <div class="modal">
            <div class="modal_box">
            </div>
        </div>
        `
    }
    
    bindToDOM(){
        this.parentEl.insertAdjacentHTML('beforeend', Modal.markup);
    }
    openModal(){
        this.modal = this.parentEl.querySelector('.modal');
        this.modal.classList.add('open');
    }
    closeModal(){
        this.modal.classList.remove('open');
    }
}