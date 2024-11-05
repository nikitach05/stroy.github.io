// Modules
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import { OverlayScrollbars } from 'overlayscrollbars';

// Compoments
import ItcCustomSelect from '../components/itc-custom-select';
import ItcMoveEl from "../components/move-elements";
import Modal from '../components/modal';
import MaskPhone from "../components/maskPhone";
import SwitchBlockByTab from '../components/switchBlockByTab';
import LiteYTEmbed from '../components/lite-ytembed';
import { slideToggle } from '../components/slide-toggle';
import modalToggle from '../components/modal-toggle';
// import WOW from 'wow.js';

document.addEventListener('DOMContentLoaded', () => {

  // new WOW().init();
  new Modal();
  new ItcMoveEl();
  new modalToggle();

  const modals = document.querySelectorAll('.modal__content');
  modals.forEach(modal => {
    OverlayScrollbars(modal, {});
  });

  // Example SwitchBlockByTab
  new SwitchBlockByTab('.tabs__item', '.blocks__item');

  // Example ItcCustomSelect
  const select = new ItcCustomSelect('.custom-select');
  document.querySelector('.custom-select').addEventListener('itc.select.change', (e) => {
    const btn = e.target.querySelector('.itc-select__toggle');
    // выбранное значение
    console.log(`Выбранное значение: ${btn.value}`);
    // индекс выбранной опции
    console.log(`Индекс выбранной опции: ${btn.dataset.index}`);
    // выбранный текст опции
    const selected = e.target.querySelector('.itc-select__option_selected');
    const text = selected ? selected.textContent : '';
    console.log(`Выбранный текст опции: ${text}`);
  });

    // Mobile menu btn toggle
	// const btnToggle = document.querySelector('.menu-toggle');
	// btnToggle.addEventListener('click', (e) => {
	// 	toggleMenu(btnToggle);
	// });

  // document.querySelector('.mobile-menu__close').addEventListener('click', (e) => {
  //     toggleMenu(btnToggle);
  // });

	// function toggleMenu(btn) {
	// 	document.querySelector('body').classList.toggle('hidden');
	// 	document.querySelector('.mobile-menu').classList.toggle('mobile-menu--opened');
	// 	document.querySelector('.menu-toggle').classList.toggle('menu-toggle--blur');
	// }

  // Set height for mobile menu
  // window.addEventListener('resize', () => {
  //     requestAnimationFrame(setMenuHeight);
  // });

  // function setMenuHeight() {
  //     const menu = document.querySelector('.mobile-menu');
  //     menu.style.height = window.innerHeight + 'px';
  // }

  // setMenuHeight();

  // Custom checkbox
  const checkboxFields = document.querySelectorAll('.checkbox-field');
  if (checkboxFields) {
    checkboxFields.forEach(checkbox => {
      let box = checkbox.querySelector('.checkbox-field__box');
      let label = checkbox.querySelector('.checkbox-field__label');
      box.addEventListener('click', toggleCheckbox);
      label.addEventListener('click', toggleCheckbox);
    });
    function toggleCheckbox(e) {
      let target = e.target.closest('.checkbox-field');
      target.querySelector('.checkbox-field__box').classList.toggle('active');
      let checkbox = target.querySelector('.checkbox-field__input');
      checkbox.checked = (checkbox.checked) ? false : true;
    }
  }

  // Custom radio
  const radioFields = document.querySelectorAll('.radio-field');
  if (radioFields) {
    radioFields.forEach(radio => {
      let box = radio.querySelector('.radio-field__box');
      let label = radio.querySelector('.radio-field__label');
      box.addEventListener('click', toggleRadio);
      label.addEventListener('click', toggleRadio);
    });
    function toggleRadio(e) {
      let target = e.target.closest('.radio-field');
      let name = target.querySelector('input').getAttribute('name');
      let radioGroup = document.querySelectorAll(`input[name="${name}"]`);
      radioGroup.forEach(input => {
        input.parentNode.querySelector('.radio-field__box').classList.remove('active');
      });
      target.querySelector('.radio-field__box').classList.add('active');
      let checkbox = target.querySelector('.radio-field__input');
      checkbox.checked = (checkbox.checked) ? false : true;
    }
  }

  // Scroll to
  document.querySelectorAll('a[href^="#"').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      let href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const topOffset = 0;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Photoswipe Lightbox
  const arrowSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" fill="none"><rect width="43" height="43" x="43.5" y="43.5" fill="#fff" rx="21.5" transform="rotate(-180 43.5 43.5)"/><path stroke="#747474" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.33 22h9.334M21.997 17.33l4.667 4.667-4.667 4.667"/><rect width="43" height="43" x="43.5" y="43.5" stroke="#E6E6E6" rx="21.5" transform="rotate(-180 43.5 43.5)"/></svg>';
  const zoom = new PhotoSwipeLightbox({
    gallery: '.js-zoom',
    children: 'a',
    arrowPrevSVG: arrowSvg,
    arrowNextSVG: arrowSvg,
    closeSVG: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" fill="none"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.25 2.75-10.5 10.5M3.75 2.75l10.5 10.5"/></svg>',
    zoom: false,
    pswpModule: PhotoSwipe
  });
  zoom.init();

  // Stop playing youtube when modal closed
  document.addEventListener('modalClose', (e) => {
    const modal = e.detail['modal'];
    let lyt = modal.querySelector('lite-youtube');
    let iframe = modal.querySelector('iframe');

    if (lyt && iframe) {
      iframe.remove();
      lyt.classList.remove('lyt-activated');
    }
  });

  MaskPhone('input[type="tel"]');

  const dateInputs = document.querySelectorAll('.date-input');
  dateInputs.forEach(dateInput => {
      dateInput.addEventListener('input', function (e) {
          let value = this.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
          if (value.length > 8) value = value.slice(0, 8); // Ограничиваем длину до 8 цифр

          // Форматируем дату
          if (value.length >= 4) {
              value = value.slice(0, 2) + '.' + value.slice(2, 4) + '.' + value.slice(4);
          } else if (value.length >= 2) {
              value = value.slice(0, 2) + '.' + value.slice(2);
          }

          this.value = value; // Устанавливаем отформатированное значение
      });

      dateInput.addEventListener('keydown', function (e) {
          if (e.key === 'Backspace' || e.key === 'Delete') {
              const value = this.value;
              const cursorPosition = this.selectionStart;

              // Удаляем точку перед курсором, если она есть
              if (cursorPosition > 0 && (value[cursorPosition - 1] === '.' || value[cursorPosition - 1] === ' ')) {
                  this.value = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
                  this.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
              }
          }
      });
  });

});