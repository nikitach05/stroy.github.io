// Modules
import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

new Swiper(".directions-slider__items", {
	modules: [Navigation],
	slidesPerView: 3,
	spaceBetween: 20,
	loop: false,
	navigation: {
		nextEl: ".directions-slider .swiper-arrows-next",
		prevEl: ".directions-slider .swiper-arrows-prev",
	},
	breakpoints: {
		0: {
			slidesPerView: 1.5,
			spaceBetween: 10,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		1320: {
			slidesPerView: 3,
			spaceBetween: 20,
		},
	},
});

const objectSliders = document.querySelectorAll('.objects-slider__items');
objectSliders.forEach(sliderEl => {
  const parentContainer = sliderEl.closest('.directions-slider') || sliderEl.parentElement;
  
  new Swiper(sliderEl, {
    modules: [Navigation],
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: parentContainer.querySelector('.swiper-arrows-next'),
      prevEl: parentContainer.querySelector('.swiper-arrows-prev'),
    },
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1320: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
});