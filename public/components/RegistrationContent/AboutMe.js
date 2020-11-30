import EducationTemplate from './Education.hbs'

export class Education {
    _form

    constructor(parent) {
    }

    async render() {
        const div = document.createElement('div');
        div.id = "education_univ";

        const divUniv = document.createElement("div");
        divUniv.classList.add('radio');

        const radioEl = this.createRadio('radio-elems', 'radio-elem', 'Учусь', 'text', 'rad1');
        divUniv.appendChild(radioEl);

        const RadioEl = this.createRadio('radio-elems', 'radio-elem', 'Оконочил', 'text', 'rad2');
        divUniv.appendChild(RadioEl);

        const radioElem = this.createRadio('radio-elems', 'radio-elem', 'Нет', 'text', 'rad3');
        divUniv.appendChild(radioElem);


             await radioEl.addEventListener('click', (evt) => {
                const div = document.getElementById('education_univ');
                div.innerHTML = '<label class="nameFormText">Я учусь</label>' +
                    '<div class="pass">'+ EducationTemplate()+'</div>';
            });

            await RadioEl.addEventListener('click', (evt) => {
                const div = document.getElementById('education_univ');
                div.innerHTML = '<label class="nameFormText">Я окончил</label>' +
                '<div class="pass">'+ EducationTemplate()+'</div>';
            });

            await radioElem.addEventListener('click', (evt) => {
                const div = document.getElementById('education_univ');
                div.innerHTML = '';
            });

        div.innerHTML = '<label class="nameFormText">Я учусь</label>' +
                        '<div class="pass">'+ EducationTemplate()+'</div>';

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