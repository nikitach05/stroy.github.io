import { slideUp, slideDown, slideToggle } from "../components/slide-toggle";

document.addEventListener("DOMContentLoaded", () => {
	// Mobile menu btn toggle
	const btnMenu = document.querySelector(".menu-toggle");
	btnMenu.addEventListener("click", onClicktoggleMenu);

	document
		.querySelector(".mobile-menu__close")
		.addEventListener("click", onClicktoggleMenu);

	function onClicktoggleMenu(e) {
		toggleMenu();

		if (
			document
				.querySelector(".mobile-menu")
				.classList.contains("mobile-menu--opened")
		) {
			bodyHidden(true);
		} else {
			bodyHidden(false);
		}
	}

	function toggleMenu() {
		document.querySelector(".header").classList.toggle("header--blur");
		document
			.querySelector(".mobile-menu")
			.classList.toggle("mobile-menu--opened");
	}

	function bodyHidden(state) {
		if (state) {
			document.body.classList.add("hidden");
		} else {
			document.body.classList.remove("hidden");
		}
	}

	// Set height for mobile menu
	window.addEventListener("resize", () => {
		requestAnimationFrame(setMenuHeight);
	});

	function setMenuHeight() {
		const menu = document.querySelector(".mobile-menu");
		menu.style.height = window.innerHeight - 20 + "px";
	}

	setMenuHeight();

	const submenus = document.querySelectorAll(".mobile-menu__list-arrow");
	submenus.forEach((slide) => {
		slide.addEventListener("click", () => {
			const parent = slide.closest(".mobile-menu__list-item");
			const content = parent.querySelector(".mobile-menu__list-submenu");

			const isOpened = parent.classList.contains("opened");

			if (isOpened) {
				// Закрываем элемент
				parent.classList.remove("opened");
				slideUp(content, 500, 'flex');
			} else {
				// Открываем элемент
				parent.classList.add("opened");
				slideDown(content, 500, 'flex');
			}
		});
	});
});
