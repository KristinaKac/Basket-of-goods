export default class Form {
    constructor(parentEl, tooltip, basket, modal) {
        this.parentEl = parentEl;
        this.tooltip = tooltip;
        this.basket = basket;
        this.modal = modal;
        this.rewriteElement;

        this.activeTooltips = [];
        this.form;
        this.formElements;

        this.onSubmit = this.onSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        Form.restoreFormElements = Form.restoreFormElements.bind(this);

        this.errors = {
            title: {
                'valueMissing': 'Пожалуйста, введите название товара',
            },
            price: {
                'valueMissing': 'Пожалуйста, введите стоимость товара',
                'patternMismatch': 'Пожалуйста, введите корректную стоимость товара',
            }
        }
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
                    <input class="input price" name="price" id="price" required pattern="(\[0-9]+(\,)?(\.[0-9]+)?)">
                </div>
                <div class="btns">
                    <button class="btn" type="submit">Сохранить</button>
                    <button class="btn cancel" type="button">Отмена</button>
                </div>
            </form>
        `
    }

    renderTooltip = (message, element) => {
        this.activeTooltips.push({
            name: element.name,
            id: this.tooltip.showTooltip(message, element),
        });
    }
    getError = (item) => {
        const errorKey = Object.keys(ValidityState.prototype).find(key => {

            if (!item.name) return;
            if (key === 'valid') return;

            this.activeTooltips.some((el, index) => {
                if (el.name === item.name) {
                    this.tooltip.removeTooltip(el.id);
                    this.activeTooltips.splice(index, 1);
                }
            });

            return item.validity[key];
        });

        if (!errorKey) return;

        return this.errors[item.name][errorKey];
    }

    bindToDOM() {
        this.parentEl.insertAdjacentHTML('beforeend', Form.markup);

        this.form = this.parentEl.querySelector('.form');
        this.formElements = [...this.form.elements];
        this.cancel = this.parentEl.querySelector('.cancel');

        this.addListeners();
    }
    addListeners() {
        this.form.addEventListener('submit', this.onSubmit);
        this.cancel.addEventListener('click', this.onCancelClick);

        [...this.form.elements].forEach(element => element.addEventListener('focus', () => {
            element.addEventListener('blur', this.onBlur);
        }));
    }

    onSubmit(e) {
        e.preventDefault();

        this.activeTooltips.forEach(tooltip => this.tooltip.removeTooltip(tooltip.id));

        const errorSubmit = this.formElements.some(element => {
            const error = this.getError(element);

            if (error) {
                this.renderTooltip(error, element);
                return true;
            }
        });

        if (errorSubmit) return;

        if (this.rewriteElement) {
            this.basket.removeRow(this.rewriteElement);
            this.rewriteElement = undefined;
        }
        this.basket.addRow(this.formElements);
        this.resetForm();
        this.modal.closeModal();
    }

    onCancelClick() {
        this.resetForm();
        this.rewriteElement = undefined;
        this.modal.closeModal();
    }

    onBlur(e) {
        const element = e.target;

        const error = this.getError(element);
        if (error) {
            this.renderTooltip(error, element);
        }
        element.removeEventListener('blur', this.onBlur);
    }

    resetForm() {
        this.form.reset();
    }

    static restoreFormElements(element) {
        const findEl = this.basket.tableElements.find(el => el.id == element.dataset.id);

        Object.entries(findEl).some(([key, value]) => {

            const formEl = this.formElements.find(el => key === el.name);
            if (formEl) formEl.value = value;
        });
        this.rewriteElement = element;
    }
}