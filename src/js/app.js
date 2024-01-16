import Form from "../components/form/form";
import Modal from "../components/modal/modal";
import Table from "../components/table/table";
import Tooltip from "../components/tooltip/tooltip";

const container = document.querySelector('.container');

const tooltips = new Tooltip();
const modal = new Modal(container);
modal.bindToDOM();

const modalBox = container.querySelector('.modal_box');

const basket = new Table(container, modal);
basket.bindToDOM();
basket.setDataFromLocalStorage();

const form = new Form(modalBox, tooltips, basket, modal);
form.bindToDOM();
