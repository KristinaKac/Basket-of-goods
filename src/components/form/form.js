export default class Form {
    constructor(parentEl, tooltip) {
        this.parentEl = parentEl;
        this.tooltip = tooltip;
        this.activeTooltips = [];
        this.form;

        this.onSubmit = this.onSubmit.bind(this);
        this.onBlur = this.onBlur.bind(this);

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
                    <button class="btn" type="button">Отмена</button>
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

    bindToDOM() {
        this.parentEl.insertAdjacentHTML('beforeend', Form.markup);
        this.form = this.parentEl.querySelector('.form');

        this.form.addEventListener('submit', this.onSubmit);

        [...this.form.elements].forEach(element => element.addEventListener('focus', () => {
            element.addEventListener('blur', this.onBlur);
        }));
    }

    getError = (item) => {
        const errorKey = Object.keys(ValidityState.prototype).find(key => {

            if (!item.name) return;
            if (key === 'valid') return;

            return item.validity[key];
        });

        if (!errorKey) return;

        return this.errors[item.name][errorKey];
    }

    onSubmit(e) {
        e.preventDefault();

        this.activeTooltips.forEach(tooltip => this.tooltip.removeTooltip(tooltip.id));

        const elements = [...this.form.elements];

        elements.some(element => {
            const error = this.getError(element);

            if (error) {
                this.renderTooltip(error, element);
                return true;
            }
        });
    }

    onBlur(e) {
        const element = e.target;

        const error = this.getError(element);
        if (error) {

            const activeErroeMessage = this.activeTooltips.some((item, index) => {
                if (item.name === element.name) {
                    this.tooltip.removeTooltip(item.id);
                    this.activeTooltips.splice(index, 1);
                }
            });

            this.renderTooltip(error, element);
        } else {
            const activeErroeMessage = this.activeTooltips.find(item => item.name === element.name);
            if (activeErroeMessage) {
                this.tooltip.removeTooltip(activeErroeMessage.id);
                this.activeTooltips.filter(item => item.name !== element.name);
            }
        }
        element.removeEventListener('blur', this.onBlur);
    }
}