import Validator from "validatorjs";

document.addEventListener('DOMContentLoaded', () => {

    const formData = new FormData();
    formData.append('name', 'John');
    formData.append('email', 'johndoe@gmail.com');
    formData.append('age', 8);

    const data = {};
    for (let [key, value] of formData) {
        data[key] = value;
    }

    console.log(data);

    let rules = {
        name: 'required',
        email: 'required|email',
        age: 'min:18'
    };

    let validation = new Validator(data, rules);

    if (validation.fails()) {
        console.log(validation.errors.get('name'));
        console.log(validation.errors.get('email'));
        console.log(validation.errors.get('age'));
    }

    // Sending forms
    const formBtn = document.querySelectorAll('.send-form');
    formBtn.forEach(btn => {
        btn.addEventListener('click', async (e) => {
        e.preventDefault();
        let form = e.target.closest('form');
        let formData = new FormData(form);
        let fields = form.querySelectorAll('.required');
        let state = validate(fields);
        if (state) {
            sendForm(formData);
        }
        });
    });

    async function sendForm(formData) {
        let response = await fetch('mail.php', {
        method: 'POST',
        body: formData
        });
        let result = await response.text();

        if (result == 'ok') {

        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('modal--opened');
        });

        document.querySelector('#success').classList.add('modal--opened');
        
        document.querySelectorAll('input[type="text"], input[type="tel"]').forEach(input => {
            input.value = '';
        });
        }
    }

    function validate(fields) {
        let state = true;
        fields.forEach(input => {
            if (input.value == '') {
                input.classList.add('error');
                state = false;
            } else {
                input.classList.remove('error');
            }
            if (input.type == 'tel') {
                let tel = input.value.replace(/[^0-9]/g,"");
                if (tel.length !== 11) {
                input.classList.add('error');
                state = false;
                } else {
                input.classList.remove('error');
                }
            }
            if (input.type == 'checkbox') {
                input.parentNode.querySelector('.checkbox-field__box').classList.toggle('error', !input.checked);

                if (input.parentNode.querySelector('.checkbox-field__box').classList.contains('error')) {
                    state = false;
                }
            }
        });
        return state;
    }

});