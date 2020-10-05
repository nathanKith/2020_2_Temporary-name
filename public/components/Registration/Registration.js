'use strict'



const data = new Map([
    ["Январь", 31],
    ["Февраль",29],
    ["Март",31],
    ["Апрель",30],
    ["Май",31],
    ["Июнь", 30],
    ["Июль", 31],
    ["Август", 31],
    ["Сентябрь", 30],
    ["Октябрь",31],
    ["Ноябрь",30],
    ["Декабрь", 31],
]);


export default class Registration {
    #parent
    constructor(parent) {
        this.#parent = parent
    }
    render() {
        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.#parent.appendChild(Form);
        form.appendChild(this.cancelButton());
        form.appendChild(this.createElem('label', 'img', undefined, "../../img/small_classic_label.png"));
        form.appendChild(this.nameOfForm('Регистрация'));
        // const cont = document.createElement('div');
        // cont.classList.add('cont')
        form.appendChild(this.createLabel('yourNumber', 'Ваш номер телефона'));
        const numb = document.createElement('div');
        numb.classList.add('number');
        const tel =  this.createReadInput('+7','readonlyNum');
        numb.appendChild(tel);
        const number = this.createInput('tel', '999-999-99-99', 'numb');
        number.required = true;
        number.pattern = '\d[0-9][0-9]{9}';
        numb.appendChild(number);
        form.appendChild(numb);
        const div = document.createElement("div");
        div.classList.add('pass');
        const pass = this.createInput('password','Пароль', 'password');
        pass.required = true;
        div.appendChild(pass)
        form.appendChild(div);
        const div2 = document.createElement("div");
        div2.classList.add('pass');
        const repeat = this.createInput('password','Повторите пароль', 'password');
        repeat.required = true;
        div2.appendChild(repeat);
        form.appendChild(div2);
        const nextButton = this.createElem('next','button', 'nextButton', 'Далее');
        nextButton.addEventListener('click', (evt) => {
            if(pass.value === repeat.value) {
                this.renderSecStep();
            } else {
                form.appendChild(this.createLabel('end-is-near','Пароли не совпадают'));
            }
        });
        form.appendChild(nextButton);
    }

    renderSecStep() {
        this.#parent.innerHTML = '';
        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.#parent.appendChild(Form);
        form.appendChild(this.cancelButton());
        form.appendChild(this.createElem('label', 'img', undefined, "../../img/small_classic_label.png"));
        form.appendChild(this.nameOfForm('Расскажите о себе:'));
        const cont = document.createElement('div');
        cont.classList.add('cont')
        cont.appendChild(this.createLabel('yourNumber', 'Моё имя'));
        cont.appendChild(this.createPassword('pass', 'password', 'Имя'));
        form.appendChild(cont);
        const nextButton = this.createElem('next','button', 'nextButton', 'Далее');
        nextButton.addEventListener('click', (evt) => {
            this.renderThirdStep();
        });
        form.appendChild(nextButton);
    }

    renderThirdStep () {
        this.#parent.innerHTML = '';
        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.#parent.appendChild(Form);
        form.appendChild(this.cancelButton());
        form.appendChild(this.createElem('label', 'img', undefined, "../../img/small_classic_label.png"));
        form.appendChild(this.nameOfForm('Расскажите о себе:'));
        form.appendChild(this.createElem('calendar', 'img', undefined, "../../img/calendar.svg"));
        form.appendChild(this.createLabel('yourNumber', 'Мой день рождения'));
        const div = document.createElement('div');
        div.classList.add('birthday');
        const month = this.createSelectMonth('month', 'Месяц', data.keys() );
        div.appendChild(month);
        const day = this.createSelectDaysByMonth('day','День', data.get(month.value) );
        day.addEventListener('focus', (evt) => {
            day.innerHTML = '';
            for (let i = 0; i < data.get(month.value); ++i) {
                const option = document.createElement('option');
                const item = i + 1;
                option.value = item.toString();
                option.textContent = item.toString();
                day.appendChild(option);
            }
        });
        div.appendChild(day);
        div.appendChild(this.createSelectYear('year', 'Год'));
        form.appendChild(div);
        const nextButton = this.createElem('next','button', 'nextButton', 'Далее');
        nextButton.addEventListener('click', (evt) => {
            this.renderFourthStep();
        });
        form.appendChild(nextButton);
    }

    renderFourthStep() {
        this.#parent.innerHTML = '';
        this.#parent.classList.remove('inner-formInf');
        this.#parent.classList.add('inner-formView');
        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.#parent.appendChild(Form);
        form.appendChild(this.buttonsTop(3));
        form.appendChild(this.createElem('label', 'img',
            undefined, "../../img/small_classic_label.png"));
        form.appendChild(this.nameOfForm('Расскажите о себе:'));
        form.appendChild(this.createLabel('yourNumber', 'Я...'));
        const div = this.createElem('sex', 'button',
            'ButtonFemale', 'Женщина');
        div.firstChild.addEventListener('click', (evt) => {
            this.renderInformation();
        });
        const man = document.createElement('button');
        man.classList.add('ButtonMale');
        man.textContent = 'Мужчина';
        div.appendChild(man);
        man.addEventListener('click', (evt) => {
            this.renderInformation();
        });
        form.appendChild(div);
    }

    renderInformation() {
        this.#parent.innerHTML = '';
        this.#parent.classList.remove('inner-formView');
        this.#parent.classList.add('inner-formInf');
        const Form = document.createElement('form');
        Form.classList.add('formInf');
        const form = this.#parent.appendChild(Form);
        form.appendChild(this.buttonsTop(4));
        form.appendChild(this.createElem('label', 'img',
            undefined, "../../img/small_classic_label.png"));
        const link = document.createElement('a');
        link.classList.add('skip');
        link.textContent = 'Пропустить';
        link.addEventListener('click', (evt) => {
            this.renderPhoto();
        });
        form.appendChild(link);
        form.appendChild(this.casualNameOfForm('Расскажите о себе<br>' +
            '<label class="podr">Поподробнее</label>', 'name'));
        // let [label, pass] = this.createFormText('nameFormText', 'Хобби', 'pass',
        //     'Гольф, йога, чтение книг', 'hobby');
        // form.appendChild(label);
        // form.appendChild(pass);
        let [label, pass] = this.createFormText('nameFormText', 'Я работаю', 'pass', 'Тренер по плаванию',
             'job');
        form.appendChild(label);
        form.appendChild(pass);
        form.appendChild(this.createLabel('University', 'Высшее образование'));
        const divUniv = document.createElement("div");
        divUniv.classList.add('radio');
        let radioEl = this.createRadio('radio-elems','radio-elem', 'Учусь', 'text', 'rad1');
        divUniv.appendChild(radioEl);
        radioEl = this.createRadio('radio-elems','radio-elem', 'Оконочил', 'text', 'rad2');
        divUniv.appendChild(radioEl);
        radioEl = this.createRadio('radio-elems','radio-elem', 'Нет', 'text', 'rad3');
        divUniv.appendChild(radioEl);
        form.appendChild(divUniv);
        [label, pass] = this.createFormText('nameFormText', 'Я учусь', 'pass', 'МГТУ им. Н.Э.Баумана',
            'education');
        form.appendChild(label);
        form.appendChild(pass);
        [label, pass] = this.createFormText('nameFormText', 'Обо мне', 'pass',
            'Обожаю гольф, играть на музыкальных инструментах',
            'about');
        form.appendChild(label);
        form.appendChild(pass);
        form.appendChild(this.createLabel('end-is-near','Почти готово!'));
        const nextButton = this.createElem('next','button', 'nextButtonEnd', 'Далее');
        nextButton.addEventListener('click', (evt) => {
            this.renderPhoto();
        });
        form.appendChild(nextButton);


    }

    renderPhoto (){
        this.#parent.innerHTML = '';
        const Form = document.createElement('form');
        Form.classList.add('form-photo');
        const form = this.#parent.appendChild(Form);
        form.appendChild(this.lastButtonsTop());
        form.appendChild(this.createElem('label', 'img',
            undefined, "../../img/small_white_label.png"));
        form.appendChild(this.casualNameOfForm('Выберите лучшие<br>' +
            '<label class="podr">фотографии.</label>', 'name-last'));
        const photo = this.createInput('file','','photo');
        photo.accept = 'image/jpeg,image/png';
        photo.id = "file";
        const label = document.createElement('label');
        label.htmlFor = 'file';
        const div = document.createElement('div');
        div.classList.add('podr');
        const img = document.createElement('img');
        img.src = '../../img/camera.svg';
        label.appendChild(img);
        div.appendChild(photo)
        div.appendChild(label);
        form.appendChild(div);
        const nextButton = this.createElem('next','button', 'endButton', 'Завершить!');
        nextButton.addEventListener('click', (evt) => {
            this.renderPhoto();
        });
        form.appendChild(nextButton);
    }

    casualNameOfForm(string, className) {
        const div = document.createElement("div");
        div.classList.add('label');

        const p = document.createElement('p');
        p.classList.add(className);
        p.innerHTML = string;
        div.appendChild(p)

        return div;
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
    lastButtonsTop() {
        const div = document.createElement('div');
        div.classList.add('back');

        const but = document.createElement('button');
        but.classList.add('arrow-last');
        div.appendChild(but)

        const img2 = document.createElement('img');
        img2.src = "../../img/left_arrow_white.svg";
        but.appendChild(img2)

        but.addEventListener('click', (evt) => {
                this.renderInformation();
        });

        const button = document.createElement('button');
        button.classList.add('last-cancelButton');
        div.appendChild(button)

        const img = document.createElement('img');
        img.src = "../../img/white_cancel.svg";
        button.appendChild(img)

        return div;
    }

    createFormText(labelClass, nameLabel, divClass, placeholder, inputClasses) {
        const label = this.createLabel(labelClass, nameLabel);
        const pass = document.createElement('div');
        pass.classList.add(divClass);
        pass.appendChild(this.createTextArea(placeholder, inputClasses));
        return [label, pass];
    }

    createTextArea(placeholder, inputClasses) {
        const input = document.createElement('textarea');
        input.placeholder = placeholder;
        input.classList.add(inputClasses);
        return input
    }

    buttonsTop(back) {
        const div = document.createElement('div');
        div.classList.add('back');

        const but = document.createElement('button');
        but.classList.add('arrow');
        div.appendChild(but)

        const img2 = document.createElement('img');
        img2.src = "../../img/left_arrow_gray.svg";
        but.appendChild(img2)

        but.addEventListener('click', (evt) => {
                switch (back) {
                    case 3:
                        this.renderThirdStep();
                        break;
                    case 4:
                        this.renderFourthStep();
                        break;
                    default:
                        this.render();
                }
        });

        const button = document.createElement('button');
        button.classList.add('cancelButton');
        div.appendChild(button)

        const img = document.createElement('img');
        img.src = "../../img/cancel_gray.svg";
        button.appendChild(img)

        return div;
    }

    cancelButton() {
        const div = document.createElement('div');
        div.classList.add('cancel');

        const button = document.createElement('button');
        button.classList.add('cancelButton');
        div.appendChild(button)

        const img = document.createElement('img');
        img.src = "../../img/cancel_gray.svg";
        button.appendChild(img)

        return div
    }
    createElem(divClass, elem, elemClass, elemSrc){
        const div = document.createElement("div");
        div.classList.add(divClass);

        const element = document.createElement(elem);
        element.classList.add(elemClass);
        if (elem === 'button') {
            element.textContent = elemSrc;
        }

        if (elem === 'img') {
            element.src = elemSrc;
        }
        div.appendChild(element);

        return div
    }
    nameOfForm (string) {
        const div = document.createElement("div");
        div.classList.add('label');

        const p = document.createElement('p');
        p.classList.add('reg');
        p.innerHTML = string;
        div.appendChild(p)

        return div;
    }
    createReadInput(value, inputClasses){
        const input = document.createElement('input');
        input.readOnly = true;
        input.value = value;
        input.classList.add(inputClasses);
        return input;
    }
    createInput(type, placeholder, inputClasses) {
        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.classList.add(inputClasses);
        return input
    }
    createLabel(classLabel, value) {
        const label = document.createElement('label');
        label.classList.add(classLabel);
        label.textContent = value;
        return label;
    }
    createPassword(divClass, inputClass, placeholder) {
        const div = document.createElement("div");
        div.classList.add(divClass);
        div.appendChild(this.createInput('', placeholder, inputClass));
        return div;
    }
    createActionButton(nameOfButton, nextForm) {
        const nextButton = this.createElem('next','button', 'nextButton', nameOfButton);
        nextButton.addEventListener('click', (evt) => {
            nextForm();
        });
        return nextButton;
    }
    createSelectMonth(classSelect, name, values ) {
        const month = document.createElement('select');
        month.classList.add(classSelect);
        month.name = name;
        for (let item of values) {
            const option = document.createElement('option');
            option.value = item;
            option.textContent = item;
            month.appendChild(option);
        }
        return month;
    }
    createSelectDaysByMonth(classSelect, name, month) {
        const day = document.createElement('select');
        day.classList.add(classSelect);
        day.name = name;
        for (let i = 0; i < month; ++i) {
            const option = document.createElement('option');
            const item = i + 1;
            option.value = item.toString();
            option.textContent = item.toString();
            day.appendChild(option);
        }
        return day;
    }
    createSelectYear (classSelect, name) {
        const year = document.createElement('select');
        year.classList.add(classSelect);
        year.name = name;

        for (let i = 2020; i > 1930; --i) {
            const option = document.createElement('option');
            const item = i;
            option.value = item.toString();
            option.textContent = item.toString();
            year.appendChild(option);
        }

        return year;
    }
}