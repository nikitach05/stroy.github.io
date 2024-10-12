export default class SwitchBlockByTab {

    constructor(tabs, blocks) {
        this.tabs = document.querySelectorAll(tabs);
        this.blocks = document.querySelectorAll(blocks);
        this.init();
    }

    init() {
        this.clickHandler = this.defaultClickHandler.bind(this);

        this.tabs.forEach(tab => {
            tab.addEventListener('click', this.clickHandler);
        });
    }

    defaultClickHandler(e) {
        const tab = e.currentTarget;
        this.tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const dataTab = tab.dataset.tab;

        const blockIndex = Array.from(this.blocks).findIndex(block => block.getAttribute('data-block') === dataTab);

        this.blocks.forEach((block, index) => {
            const isActive = index === blockIndex;
            block.classList.toggle('active', isActive);
        });
    }

    disableClickEvents() {
        this.tabs.forEach(tab => {
            tab.removeEventListener('click', this.clickHandler);
        });
    }

    changeClickEvents(newHandler) {
        this.disableClickEvents();

        this.clickHandler = newHandler;
        this.tabs.forEach(tab => {
            tab.addEventListener('click', this.clickHandler);
        });
    }
}