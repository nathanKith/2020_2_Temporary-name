'use strict'

import ajax from "../../modules/ajax.js";
import {feedPage} from "../../main.js";
import LandingHeader from "../LandingHeader/LandingHeader";

const url = `http://95.163.213.222:8080/api/v1`;

export default class Authorization {
    #parent
    constructor(parent) {
        this.#parent = parent
    }
    render() {
        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.#parent.appendChild(Form);

        const back = document.createElement('a');
        back.href = "/";
        back.dataset.section = 'landing';
        back.classList.add('link');
        back.appendChild(this.cancelButton());
        form.appendChild(back);
        form.appendChild(this.createElem('small-label', 'img', undefined, "../../img/small_classic_label.png"));
        form.appendChild(this.nameOfForm('Вход в MIAMI'));
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
        pass.name = 'password';
        pass.required = true;
        div.appendChild(pass)
        form.appendChild(div);


        let message = this.createMessage();
        form.appendChild(message);

        // const link = document.createElement('a');
        // link.href = "/feed";
        // link.dataset.section = "feed";
        // link.classList.add('link');

        const nextButton = this.createElem('next','button', 'nextButton', 'Далее');

        nextButton.addEventListener('click', (evt) => {

            if (!number.validity.valid) {
                message.innerHTML = 'Неверно введен номер телефона';
                return ;
            }
            if (pass.value === ''){
                message.innerHTML = 'Введены не все поля';
                return;
            }
            const Json = {
                telephone: number.value,
                password: pass.value,
            }
            ajax.ajaxPost(url + '/login', Json).
                then(({status, responseObject}) => {
                    if (status === 200) {
                        alert('Успешная авторизация');
                        feedPage();
                    } else {
                        alert('Такого пользователя не существует');
                    }
                }).catch((err) => {
                    alert(err);
            });

        });
        // link.appendChild(nextButton);

        form.appendChild(nextButton);
    }

    createMessage() {
        let message = document.createElement('div');
        message.id = 'mes';
        message.classList.add('message');
        return message;
    }


    cancelButton() {
        const div = document.createElement('div');
        div.classList.add('cancel');

        const button = document.createElement('button');
        button.classList.add('cancelButton');
        button.type = 'button';
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
}
module.exports = Authorization;