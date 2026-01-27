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

	// ItcCustomSelect compositions
	let selectCompositions;
	if (document.querySelector(".composition-select")) {
		selectCompositions = new ItcCustomSelect(".composition-select");
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
	const systemTabs = document.querySelectorAll(
		".tank-solutions__content-list-item",
	);
	systemTabs.forEach((tab) => {
		tab.addEventListener("click", () => {
			const dataTab = tab.dataset.system;
			const block = document.querySelector(
				`.system-composition .tabs__item[data-tab="${dataTab}"]`,
			);
			if (!block) return;
			block.click();
			Promise.resolve().then(() => block.classList.add("active"));

			// Change value of the mobile select
			const slectedItem = document.querySelector(`.composition-select .itc-select__option[data-tab="${dataTab}"]`);
			if (!slectedItem) return;
			slectedItem.click();
		});
	});

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

	// Fixed navigation scroll handler
	const fixedNav = document.querySelector(".fixed-nav");
	const mainBlock = document.querySelector("#main");
	
	if (fixedNav && mainBlock) {
		function handleScroll() {
			const mainBlockBottom = mainBlock.offsetTop + mainBlock.offsetHeight;
			const scrollPosition = window.scrollY + window.innerHeight / 2;
			
			if (scrollPosition > mainBlockBottom) {
				fixedNav.classList.add("active");
			} else {
				fixedNav.classList.remove("active");
			}
		}
		
		// Initial check
		handleScroll();
		
		// Listen to scroll events
		window.addEventListener("scroll", handleScroll, { passive: true });
	}

	// Fixed navigation item click handler
	const fixedNavLinks = document.querySelectorAll(".fixed-nav__item-link");
	fixedNavLinks.forEach((link) => {
		link.addEventListener("click", (e) => {
			// Remove active class from all links
			fixedNavLinks.forEach((l) => l.classList.remove("active"));
			// Add active class to clicked link
			link.classList.add("active");
		});
	});
});