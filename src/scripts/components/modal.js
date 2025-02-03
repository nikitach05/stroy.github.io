export default class Modal {
    constructor() {
        this._init();
    }

    _init() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-modal]');
            if (btn) {
                e.preventDefault();
                const modalID = btn.dataset.modal;
                const modal = document.querySelector(`#${modalID}`);

                if (modal) {
                    // Открытие модального окна
                    document.body.append(modal);
                    modal.classList.add('modal--opened');
                    requestAnimationFrame(() => {
                        modal.classList.add('modal--animated');
                    });

                    document.body.classList.add('hidden');
                }
            }
        });

        document.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                const excludedElement = modal.querySelector('.modal__wrapper');
                if (!excludedElement.contains(e.target)) {
                    this._closeModal(modal);
                }
            }
        });

        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-modal-close]');
            if (btn) {
                e.preventDefault();
                const modal = btn.closest('.modal');
                if (modal) {
                    this._closeModal(modal);
                }
            }
        });
    }

    _closeModal(modal) {
        modal.classList.remove('modal--opened');
        modal.classList.remove('modal--animated');

        // Диспатч кастомного события
        const customEvent = new CustomEvent('modalClose', { detail: { modal } });
        document.dispatchEvent(customEvent);

        document.body.classList.remove('hidden');
    }
}