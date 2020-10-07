'use strict'


import RegistrationData from "../../modules/registrationData.js";
import ajax from "../../modules/ajax.js";

const url = ``;

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
    json = new RegistrationData();
    #parent
    constructor(parent) {
        this.#parent = parent
    }
    render() {
        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.#parent.appendChild(Form);

        form.appendChild(this.cancelButton());
        form.appendChild(this.createElem('small-label', 'img', undefined, "../../img/small_classic_label.png"));
        form.appendChild(this.nameOfForm('Регистрация'));
        form.appendChild(this.createLabel('yourNumber', 'Ваш номер телефона'));

        const numb = document.createElement('div');
        numb.classList.add('number');

        const tel =  this.createReadInput('+7','readonlyNum');
        numb.appendChild(tel);

        const number = this.createInput('tel', '999-999-99-99', 'numb');
        number.id = 'number';
        number.required = true;
        number.pattern = '[9]{1}[0-9]{2}[-]{1}[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2}';
        numb.appendChild(number);
        form.appendChild(numb);

        const div = document.createElement("div");
        div.classList.add('pass');

        const pass = this.createInput('password','Пароль', 'password');
        pass.autocomplete = 'on';
        pass.name = 'password';
        pass.required = true;
        div.appendChild(pass)
        form.appendChild(div);

        const div2 = document.createElement("div");
        div2.classList.add('pass');

        const repeat = this.createInput('password','Повторите пароль', 'password');
        repeat.required = true;
        repeat.autocomplete = 'on';
        repeat.name = 'repeat-password';
        div2.appendChild(repeat);
        form.appendChild(div2);

        let message = this.createMessage();
        form.appendChild(message);
        const nextButton = this.createElem('next','button', 'nextButton', 'Далее');

        nextButton.addEventListener('click', (evt) => {

            if (!number.validity.valid) {
                message.innerHTML = 'Неверно введен номер телефона';
                return ;
            }
            if (pass.value === '' || repeat.value === ''){
                message.innerHTML = 'Введены не все поля';
                return;
            }
            if (pass.value !== repeat.value) {
                console.log('Пароли не совпадают');
                message.innerHTML = 'Пароли не совпадают';
            }
            if (pass.value === repeat.value) {
                this.json.telephone = number.value;
                this.json.password = pass.value;
                this.renderSecStep();
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
        form.appendChild(this.createElem('small-label', 'img', undefined, "../../img/small_classic_label.png"));
        form.appendChild(this.nameOfForm('Расскажите о себе:'));
        form.appendChild(this.createLabel('yourNumber', 'Моё имя'));

        const div = document.createElement('div');
        div.classList.add('pass');

        let name = this.createInput('text', 'Имя', 'password');
        div.appendChild(name);
        form.appendChild(div);

        let message = this.createMessage();
        form.appendChild(message);

        const nextButton = this.createElem('next','button', 'nextButton', 'Далее');
        nextButton.addEventListener('click', (evt) => {
            if (name.value !== '') {
                this.json.name = name.value;
                this.renderThirdStep();
            } else {
                message.innerHTML = 'Введите имя'
                return ;
            }
        });
        form.appendChild(nextButton);
    }

    renderThirdStep () {
        this.#parent.innerHTML = '';
        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.#parent.appendChild(Form);

        form.appendChild(this.cancelButton());
        form.appendChild(this.createElem('small-label', 'img', undefined, "../../img/small_classic_label.png"));
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
        const year = this.createSelectYear('year', 'Год');
        div.appendChild(year);
        form.appendChild(div);

        const nextButton = this.createElem('next','button', 'nextButton', 'Далее');
        nextButton.addEventListener('click', (evt) => {
            this.json.day = day.value;
            this.json.month = month.value;
            this.json.year = year.value;
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
        form.appendChild(this.createElem('small-label', 'img',
            undefined, "../../img/small_classic_label.png"));
        form.appendChild(this.nameOfForm('Расскажите о себе:'));
        form.appendChild(this.createLabel('yourNumber', 'Я...'));

        const div = this.createElem('sex', 'button',
            'ButtonFemale', 'Женщина');
        div.firstChild.addEventListener('click', (evt) => {
            this.json.sex = 'female'
            this.renderInformation();
        });

        const man = document.createElement('button');
        man.classList.add('ButtonMale');
        man.textContent = 'Мужчина';
        div.appendChild(man);
        man.addEventListener('click', (evt) => {
            this.json.sex = 'male'
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
        form.appendChild(this.createElem('small-label', 'img',
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
        const div = document.createElement('div');
        div.id = "education_univ";

        let [label, pass] = this.createFormText('nameFormText', 'Я работаю', 'pass',
            'Тренер по плаванию',
             'job');
        pass.firstElementChild.id = 'job';
        pass.firstElementChild.name = 'job';
        form.appendChild(label);
        form.appendChild(pass);
        form.appendChild(this.createLabel('University', 'Высшее образование'));

        const divUniv = document.createElement("div");
        divUniv.classList.add('radio');

        const divOps = document.getElementById('education_univ');
        const radioEl = this.createRadio('radio-elems','radio-elem', 'Учусь', 'text', 'rad1');
        radioEl.addEventListener('click', (evt) => {
            const div = document.getElementById('education_univ');
            div.innerHTML = '<label class="nameFormText">Я учусь</label>' +
                '<div class="pass"><textarea placeholder="МГТУ им. Н.Э.Баумана" class="education" id="univer" name="univer"></textarea></div>'
        });
        divUniv.appendChild(radioEl);

        const RadioEl = this.createRadio('radio-elems','radio-elem', 'Оконочил', 'text', 'rad2');
        RadioEl.addEventListener('click', (evt) => {
            const div = document.getElementById('education_univ');
            div.innerHTML = '<label class="nameFormText">Я окончил</label>' +
                '<div class="pass"><textarea placeholder="МГТУ им. Н.Э.Баумана" class="education" id="univer" name="univer"></textarea></div>';
        });
        divUniv.appendChild(RadioEl);

        const radioElem = this.createRadio('radio-elems','radio-elem', 'Нет', 'text', 'rad3');
        radioElem.addEventListener('click', (evt) => {
            const div = document.getElementById('education_univ');
            div.innerHTML = '';
        });
        divUniv.appendChild(radioElem);

        form.appendChild(divUniv);
        form.appendChild(div);
        let [specLabel, specPass] = this.createFormText('nameFormText', 'Я учусь', 'pass', 'МГТУ им. Н.Э.Баумана',
            'education');
        specPass.firstElementChild.id = 'univer';
        specPass.firstElementChild.name = 'univer';
        div.appendChild(specLabel);
        div.appendChild(specPass);

        const [Label, aboutMe] = this.createFormText('nameFormText', 'Обо мне', 'pass',
            'Обожаю гольф, играть на музыкальных инструментах',
            'about');
        aboutMe.firstElementChild.id = "about";
        aboutMe.firstElementChild.name = 'about';
        form.appendChild(Label);
        form.appendChild(aboutMe);

        form.appendChild(this.createLabel('end-is-near','Почти готово!'));

        const nextButton = this.createElem('next','button', 'nextButtonEnd', 'Далее');
        nextButton.addEventListener('click', (evt) => {
            this.json.job = document.getElementById('job').value;
            if (document.getElementById('univer')){
                this.json.education = document.getElementById('univer').value;
            }
            this.json.aboutMe = document.getElementById('about').value;
            this.renderPhoto();
        });
        form.appendChild(nextButton);
    }

    renderPhoto (){
        this.#parent.innerHTML = '';
        this.#parent.classList.remove('inner-formInf');
        this.#parent.classList.add('inner-formView');
        const Form = document.createElement('form');
        Form.classList.add('form-photo');
        Form.method = "POST";
        Form.enctype = 'multipart/form-data';
        const form = this.#parent.appendChild(Form);

        form.appendChild(this.lastButtonsTop());
        form.appendChild(this.createElem('small-label', 'img',
            undefined, "../../img/small_white_label.png"));

        form.appendChild(this.casualNameOfForm('Выберите лучшие<br>' +
            '<label class="podr">фотографии.</label>', 'name-last'));

        const photo = this.createInput('file','','photo');
        photo.accept = 'image/jpeg,image/png';
        photo.id = "file";
        photo.name = 'photo';

        const label = document.createElement('label');
        label.htmlFor = 'file';
        label.classList.add('out');

        const div = document.createElement('div');
        div.classList.add('podr');

        const img = document.createElement('img');
        img.src = '../../img/camera.svg';

        label.appendChild(img);
        div.appendChild(photo)
        div.appendChild(label);
        form.appendChild(div);

        let message = document.createElement('div');
        message.id = 'mes';
        message.classList.add('message-last');
        form.appendChild(message);

        const link = document.createElement('a');
        link.href = "/login";
        link.dataset.section = 'login';
        link.classList.add('link');
        const nextButton = this.createElem('next','button', 'endButton', 'Завершить!');
        nextButton.addEventListener('click', (evt) => {
            if (!photo.value) {
                message.innerHTML = 'Выберите фото';
                return ;
            }
            let photoInf = new FormData(Form);
            const avatar = photoInf.get('photo');
            this.json.photo = avatar;
            const Json = {
                telephone: this.json.telephone,
                password:  this.json.password,
                name:  this.json.name,
                day:  this.json.day,
                month:  this.json.month,
                year:  this.json.year,
                sex:  this.json.sex,
                job:  this.json.job,
                education:  this.json.education,
                aboutMe:  this.json.aboutMe,
                photo:  this.json.photo,
            };

            ajax.ajaxPost(url + `/signup`, Json).
            then(({status, responseObject}) => {
                if (status === 401) {
                    alert('Такой пользователь уже зарегистрирован!');
                }
                if (status === 200 ) {
                    alert('Успешно зарегистрировались!');
                }
            }).catch((err) => {
                alert(err);
            });
        });
        link.appendChild(nextButton);
        form.appendChild(link);
    }

    createMessage() {
        let message = document.createElement('div');
        message.id = 'mes';
        message.classList.add('message');
        return message;
    }

    casualNameOfForm(string, className) {
        const div = document.createElement("div");
        div.classList.add('small-label');

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

        const link = document.createElement('a');
        link.href = '/';
        link.dataset.section = 'landing'
        link.classList.add('link');

        const button = document.createElement('button');
        button.classList.add('last-cancelButton');
        button.type = "button";
        link.appendChild(button);

        div.appendChild(link)

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

        const link = document.createElement('a');
        link.href = '/';
        link.dataset.section = 'landing'
        link.classList.add('link');

        const button = document.createElement('button');
        button.classList.add('cancelButton');
        button.type = 'button';
        link.appendChild(button);

        div.appendChild(link);

        const img = document.createElement('img');
        img.src = "../../img/cancel_gray.svg";
        button.appendChild(img);

        return div;
    }

    cancelButton() {
        const div = document.createElement('div');
        div.classList.add('cancel');

        const link = document.createElement('a');
        link.classList.add('link');
        link.href = "/";
        link.dataset.section = "landing";
        div.appendChild(link);

        const button = document.createElement('button');
        button.classList.add('cancelButton');
        button.type = 'button';
        link.appendChild(button)

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
            element.type = 'button';
        }

        if (elem === 'img') {
            element.src = elemSrc;
        }
        div.appendChild(element);

        return div
    }
    nameOfForm (string) {
        const div = document.createElement("div");
        div.classList.add('small-label');

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

        for (let i = 2004; i > 1930; --i) {
            const option = document.createElement('option');
            const item = i;
            option.value = item.toString();
            option.textContent = item.toString();
            year.appendChild(option);
        }

        return year;
    }
}