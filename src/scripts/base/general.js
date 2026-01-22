// Modules
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Compoments
import '../components/sliders';
import { MaskPhone } from '../components/input-masks';
import { slideUp, slideDown, slideToggle } from "../components/slide-toggle";
import "../components/checkbox";
import ShowBlockByTab from "../components/show-block-by-tab";
import AnchorScroll from "../components/anchor-scroll";
import ItcCustomSelect from "../components/itc-custom-select";

document.addEventListener('DOMContentLoaded', () => {
	new MaskPhone('input[type="tel"]');
	new AnchorScroll();

	Fancybox.bind("[data-fancybox]", {
		Thumbs: {
			type: "classic",
		},
		hideScrollbar: false,
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
				},
			);
		});
	});

	// ItcCustomSelect doctors
	if (document.querySelector(".composition-select")) {
		const select = new ItcCustomSelect(".composition-select");
		// document.querySelector(".doctors-select").addEventListener("itc.select.change", (e) => {
		// 	const btn = e.target.querySelector(".itc-select__toggle");
		// 	// выбранное значение
		// 	console.log(`Выбранное значение: ${btn.value}`);
		// 	// индекс выбранной опции
		// 	console.log(`Индекс выбранной опции: ${btn.dataset.index}`);
		// 	// выбранный текст опции
		// 	const selected = e.target.querySelector(".itc-select__option_selected");
		// 	const text = selected ? selected.textContent : "";
		// 	console.log(`Выбранный текст опции: ${text}`);
		// });
	}

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

	// Slide down steps
	slideDownBlock(".steps");

	// Slide down faq
	slideDownBlock(".faq");

	function slideDownBlock(container) {
		const parent = document.querySelector(container);

		if (!parent) return;

		const slides = parent.querySelectorAll(".slide-down__head");

		// Устанавливаем состояние для первого открытого элемента
		const firstOpenedItem = document.querySelector(".slide-down.opened");
		if (firstOpenedItem) {
			const firstContent = firstOpenedItem.querySelector(
				".slide-down__content",
			);
			// Правильное состояние для анимации
			firstContent.style.display = "block";
			firstContent.style.height = "auto";
			firstContent.style.overflow = "visible";
		}

		slides.forEach((slide) => {
			slide.addEventListener("click", () => {
				const parent = slide.closest(".slide-down");
				const content = parent.querySelector(".slide-down__content");

				const isOpened = parent.classList.contains("opened");

				if (isOpened) {
					// Закрываем элемент
					parent.classList.remove("opened");
					slideUp(content, 500);
				} else {
					// Открываем элемент
					parent.classList.add("opened");
					slideDown(content, 500);
				}
			});
		});
	}

	// Show/hide direction blocks
	new ShowBlockByTab(".directions-section");

	// Show/hide system-composition blocks
	new ShowBlockByTab(".system-composition");

	// Show/hide tank-solutions blocks
	new ShowBlockByTab(".tank-solutions");
	const tankTabs = document.querySelectorAll(".where-used__item");
	tankTabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			const dataTab = tab.dataset.tab;
			const block = document.querySelector(
				`.tank-solutions__item[data-tab="${dataTab}"]`,
			);
			if (!block) return;
			block.click();
		});
	});

	// Show/hide objects sliders
	new ShowBlockByTab(".objects-section");

	// Show/hide document blocks
	new ShowBlockByTab(".documents-block");

	// Show/hide tech blocks
	new ShowBlockByTab(".tech-chars");

	const smButtons = document.querySelectorAll(".system-composition__show-more");
	smButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const parent = button.parentNode;
			const content = parent.querySelector(".system-composition__content");
			content.classList.add("opened");
			button.style.display = "none";
		});
	});
	
});