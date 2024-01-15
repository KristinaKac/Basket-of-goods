import remove from '../../assets/img/remove.png'
import edit from '../../assets/img/edit.png'
import plus from '../../assets/img/plus.png'

export default class Table {
    constructor(parentEl, modal) {
        this.parentEl = parentEl;
        this.modal = modal;
    }

    static get markup() {
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
                    <tr>
                        <td>Iphone</td>
                        <td>60 000</td>
                        <td>
                            <button class="edit_btn" type="button"><img class="edit" src="${edit}" alt="edit"></button>
                            <button class="remove_btn" type="button"><img class="remove" src="${remove}" alt="remove"></button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
        `
    }

    bindToDOM() {
        this.parentEl.insertAdjacentHTML('beforeend', Table.markup);

        this.onClick();
    }
    onClick() {
        this.parentEl.addEventListener('click', (e) => {
            if (e.target.closest('.add_btn')) {
                this.modal.openModal();
            }
            if (e.target.closest('.edit_btn')) {
                this.modal.openModal();

            }
            if (e.target.closest('.remove_btn')) {

            }
        });
    }




}