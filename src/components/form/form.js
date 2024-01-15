export default class Modal {
    constructor(parentEl) {
        this.parentEl = parentEl;
    }

    static get markup() {
        return `
            <form class="form" novalidate>
                <div class="form-control">
                    <label class="label_input" for="title">Название</label>
                    <input type="text" class="input title" name="title" id="title" required>
                </div>
                <div class="form-control">
                    <label class="label_input" for="price">Стоимость</label>
                    <input type="text" class="input price" name="price" id="price" required>
                </div>
                <div class="btns">
                    <button class="btn" type="submit">Сохранить</button>
                    <button class="btn" type="button">Отмена</button>
                </div>
            </form>
        `
    }

    bindToDOM() {
        this.parentEl.insertAdjacentHTML('beforeend', Modal.markup);
    }
    openModal() {
        this.modal = this.parentEl.querySelector('.modal');
        this.modal.classList.add('open');
    }


}