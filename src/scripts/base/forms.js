import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

// Clear form fields helper function
function clearFormFields(form) {
	form
		.querySelectorAll(
			'input[type="text"], input[type="tel"], input[type="email"], input[type="password"], textarea'
		)
		.forEach((input) => {
			if (!input.hasAttribute("type") || input.type !== "hidden") {
				input.value = "";
			}
		});
}

// Sending forms
const formBtn = document.querySelectorAll(".send-form");
formBtn.forEach((btn) => {
	btn.addEventListener("click", async (e) => {
		e.preventDefault();
		let form = btn.closest("form");
		let formData = new FormData(form);
		let fields = form.querySelectorAll(".required");
		let state = validate(fields);
		if (state) {
			showButtonLoader(btn);
			sendForm(formData, form, btn);
		}
	});
});

async function sendForm(formData, form, button = null) {
}

function validate(fields) {
	let state = true;
	fields.forEach((input) => {
		if (input.value == "") {
			input.classList.add("error");
			state = false;
		} else {
			input.classList.remove("error");
		}

		if (input.type == "tel") {
			let tel = input.value.replace(/[^0-9]/g, "");
			if (tel.length !== 11) {
				input.classList.add("error");
				state = false;
			} else {
				input.classList.remove("error");
			}
		}

		if (input.type == "email") {
			const email = input.value.trim();
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			if (!emailRegex.test(email)) {
				input.classList.add("error");
				state = false;
			} else {
				input.classList.remove("error");
			}
		}

		if (input.type == "checkbox") {
			input.parentNode
				.querySelector(".checkbox-field__box")
				.classList.toggle("error", !input.checked);

			if (
				input.parentNode
					.querySelector(".checkbox-field__box")
					.classList.contains("error")
			) {
				state = false;
			}
		}
	});
	return state;
}