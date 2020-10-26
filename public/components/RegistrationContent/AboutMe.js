export class Education {
    _form

    constructor(parent) {
        // this._form = docu;
    }

    async render() {
        const div = document.createElement('div');
        div.id = "education_univ";

        // this._form.appendChild(this.createLabel('University', 'Высшее образование'));

        const divUniv = document.createElement("div");
        divUniv.classList.add('radio');


        const radioEl = this.createRadio('radio-elems', 'radio-elem', 'Учусь', 'text', 'rad1');
        divUniv.appendChild(radioEl);

        const RadioEl = this.createRadio('radio-elems', 'radio-elem', 'Оконочил', 'text', 'rad2');
        divUniv.appendChild(RadioEl);

        const radioElem = this.createRadio('radio-elems', 'radio-elem', 'Нет', 'text', 'rad3');
        divUniv.appendChild(radioElem);


        // this._form.appendChild(divUniv);
        // this._form.appendChild(div);

             await radioEl.addEventListener('click', (evt) => {
                console.log('1');
                const div = document.getElementById('education_univ');
                div.innerHTML = '<label class="nameFormText">Я учусь</label>' +
                    '<div class="pass"><textarea placeholder="МГТУ им. Н.Э.Баумана" class="education" id="univer" name="univer"></textarea></div>'
            });

            await RadioEl.addEventListener('click', (evt) => {
                console.log('2');
                const div = document.getElementById('education_univ');
                div.innerHTML = '<label class="nameFormText">Я окончил</label>' +
                    '<div class="pass"><textarea placeholder="МГТУ им. Н.Э.Баумана" class="education" id="univer" name="univer"></textarea></div>';
            });

            await radioElem.addEventListener('click', (evt) => {
                console.log('3');
                const div = document.getElementById('education_univ');
                div.innerHTML = '';
            });





        div.innerHTML = '<label class="nameFormText">Я учусь</label>' +
            '<div class="pass"><textarea placeholder="МГТУ им. Н.Э.Баумана" class="education" id="univer" name="univer"></textarea></div>';

        // return this._form;
        return [this.createLabel('University', 'Высшее образование'), divUniv, div];

    }

    createLabel(classLabel, value) {
        const label = document.createElement('label');
        label.classList.add(classLabel);
        label.textContent = value;
        return label;
    }

    createRadio(divClass, radioClass, text, textClass, id) {
        const div = document.createElement('div');
        div.classList.add(divClass);

        const input = this.createInput('radio', '', radioClass);
        input.name = 'education';
        input.id = id;
        div.appendChild(input);

        const label = document.createElement('label');
        label.classList.add(textClass);
        label.textContent = text;
        label.htmlFor = id;
        div.appendChild(label);

        return div;
    }

    createInput(type, placeholder, inputClasses) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.classList.add(inputClasses);
        return input
    }
}