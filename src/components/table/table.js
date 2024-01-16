import remove from '../../assets/img/remove.png'
import edit from '../../assets/img/edit.png'
import plus from '../../assets/img/plus.png'
import Form from '../form/form';

export default class Table {
    constructor(parentEl, modal) {
        this.parentEl = parentEl;
        this.modal = modal;
        this.tableElements = [];

        this.columns = {
            'title': 'Название',
            'price': 'Стоимость',
        }
    }

    static get markupBasket() {
        return `
        <div class="basket_wrapper">
            <div class="basket">
                <h2>Товары</h2>
                <button type="submit" class="add_btn"><img class="edit" src="${plus}" alt="edit"></button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Стоимость</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
        `
    }

    markupElement(title, price, id) {
        return `
        <tr data-id="${id}">
            <td class="title">${title}</td>
            <td class="price">${price}</td>
            <td>
                <button class="edit_btn" type="button"><img class="edit" src="${edit}" alt="edit"></button>
                <button class="remove_btn" type="button"><img class="remove" src="${remove}" alt="remove"></button>
            </td>
        </tr>
        `
    }


    bindToDOM() {
        this.parentEl.insertAdjacentHTML('beforeend', Table.markupBasket);

        this.onClick();
    }

    setDataFromLocalStorage() {
        const basket = JSON.parse(localStorage.getItem('basket'));

        if (!basket) return;

        basket.forEach(item => this.tableElements.push(item));

        this.tableElements.forEach(item => this.renderRow(item));
    }

    onClick() {
        this.parentEl.addEventListener('click', (e) => {
            if (e.target.closest('.add_btn')) {
                this.modal.openModal();
            }
            if (e.target.closest('.edit_btn')) {
                const el = e.target.closest('tr');

                Form.restoreFormElements(el);
                
                this.modal.openModal();
            }
            if (e.target.closest('.remove_btn')) {
                const el = e.target.closest('tr');
                this.removeRow(el);
            }
        });
    }
    addRow(elements) {
        const items = {};

        const row = [...elements].filter(element => this.columns[element.name]);
        Array.from(row).forEach(item => {

            items[item.name] = item.value;

        });
        const id = performance.now();

        items.id = id;

        this.tableElements.push(items);

        this.renderRow(items);
        this.updateLocalStorage();
    }
    removeRow(el) {
        this.tableElements = this.tableElements.filter(item => item.id != el.dataset.id);
        this.updateLocalStorage();
        el.remove();

        console.log(this.tableElements)
    }

    renderRow(items) {
        const tbody = this.parentEl.querySelector('tbody');
        const { title, price, id } = items;

        const markupEl = this.markupElement(title, price, id);
        tbody.insertAdjacentHTML('beforeend', markupEl);
    }

    updateLocalStorage() {
        localStorage.setItem('basket', JSON.stringify(this.tableElements));
    }
    getDataFromLocalStorage() {
        localStorage.getItem('basket');
    }
}