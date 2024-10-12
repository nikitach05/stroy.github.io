export default class Modal {
    constructor() {
        this._els = document.querySelectorAll('.modal');
        this._btns = document.querySelectorAll('[data-modal]');
        this._closes = document.querySelectorAll('[data-modal-close]');
        this._init();
    }
    _init() {
        this._btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                let modalID = btn.dataset.modal;
                let modal = document.querySelector(`#${modalID}`);

                // Open modal
                document.body.append(modal);
                modal.classList.add('modal--opened');
            });
        });

        this._els.forEach(modal => {
            modal.addEventListener('click', (e) => {
                let target = e.target;
                let excludedElement = modal.querySelector('.modal__wrapper');
                if (!excludedElement.contains(target)) {
                    this._closeModal(modal);
                }
            });
        });

        // Close modal by attribute
        this._closes.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                let modal = btn.closest('.modal');
                this._closeModal(modal);
            });
        });
    }
    _closeModal(modal) {
        modal.classList.remove('modal--opened');
        // Dispatch the custom event
        const customEvent = new CustomEvent('modalClose', { detail: { ['modal']: modal }});
        document.dispatchEvent(customEvent);
    }
}