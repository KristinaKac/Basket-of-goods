export default class Tooltip {
    constructor() {
        this.tooltips = [];
    }
    static get getTooltip() {
        const div = document.createElement('div');
        div.className = 'form-error';
        return div;
    }
    showTooltip(message, element) {
        const tooltip = Tooltip.getTooltip;
        tooltip.innerText = message;

        const id = performance.now();

        this.tooltips.push({
            id,
            el: tooltip,
        });

        document.body.appendChild(tooltip);

        const { top, left } = element.getBoundingClientRect();

        tooltip.style.left = left + element.offsetWidth + 5 + 'px';
        tooltip.style.top = top + (element.offsetHeight / 2) - (tooltip.offsetHeight / 2) + 'px';

        return id;
    }

    removeTooltip(id){
        const tooltip = this.tooltips.find(item => item.id == id);

        tooltip.el.remove();

        this.tooltips.filter(item => item.id != id);
    }
}