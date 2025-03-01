// Modules
import Swiper from "swiper";
import { Navigation, Pagination } from 'swiper/modules';

const slider = new Swiper('.slider__items', {
    modules: [ Navigation, Pagination ],
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: '.slider .swiper-arrows-next',
        prevEl: '.slider .swiper-arrows-prev'
    },
    pagination: {
        el: '.slider .swiper-pagination',
        clickable: false
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            centeredSlides: false
        },
        1320: {
            slidesPerView: 3,
            centeredSlides: true,
        }
    }
});