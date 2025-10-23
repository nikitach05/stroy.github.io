// Modules
import { OverlayScrollbars } from 'overlayscrollbars';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Compoments
import Modal from '../components/modal';
import '../components/sliders';
import { MaskPhone } from '../components/input-masks';

document.addEventListener('DOMContentLoaded', () => {
	new Modal();

	new MaskPhone('input[type="tel"]');

	Fancybox.bind("[data-fancybox]", {
		Thumbs: {
			type: "classic",
		},
		hideScrollbar: false,
	});

	const modals = document.querySelectorAll(".modal__content");
	modals.forEach((modal) => {
		OverlayScrollbars(modal, {});
	});

	// Fancybox order-modal
	const orderModalButtons = document.querySelectorAll(".order-modal");
	orderModalButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();

			// Открываем модальное окно через Fancybox
			Fancybox.show(
				[
					{
						src: "#order-modal",
						type: "inline",
					},
				],
				{
					hideScrollbar: false,
					backdropClick: "close",
					keyboard: {
						Escape: "close",
					},
				}
			);
		});
	});

	// Сохраняем текущий URL и позицию прокрутки перед обновлением
	window.addEventListener("beforeunload", () => {
		sessionStorage.setItem("lastUrl", window.location.href);
		sessionStorage.setItem("scrollPosition", window.scrollY);
	});

	// Восстанавливаем позицию после загрузки, если это та же страница
	window.addEventListener("load", () => {
		const lastUrl = sessionStorage.getItem("lastUrl");
		const scrollPosition = sessionStorage.getItem("scrollPosition");

		// Если предыдущий URL совпадает с текущим - восстанавливаем позицию
		if (lastUrl === window.location.href && scrollPosition) {
			window.scrollTo(0, parseInt(scrollPosition));
		}

		// Очищаем сохранённые данные
		sessionStorage.removeItem("lastUrl");
		sessionStorage.removeItem("scrollPosition");
	});
});