import Form from "../components/form/form";
import Modal from "../components/modal/modal";
import Table from "../components/table/table";
import Tooltip from "../components/tooltip/tooltip";

const container = document.querySelector('.container');

const modal = new Modal(container);
modal.bindToDOM();

const tooltips = new Tooltip();

const form = new Form(container.querySelector('.modal_box'), tooltips);
form.bindToDOM();

const basket = new Table(container, modal);
basket.bindToDOM();