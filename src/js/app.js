import Modal from "../components/modal/modal";
import Table from "../components/table/table";

const container = document.querySelector('.container');

const modal = new Modal(container);
modal.bindToDOM();

const basket = new Table(container, modal);
basket.bindToDOM();