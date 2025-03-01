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
        }
    });

    const modals = document.querySelectorAll('.modal__content');
    modals.forEach(modal => {
        OverlayScrollbars(modal, {});
    });
    
});