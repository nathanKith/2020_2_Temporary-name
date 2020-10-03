'use strict'



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
        const cont = document.createElement('div');
        cont.classList.add('cont')
        cont.appendChild(this.createLabel('yourNumber', 'Ваш номер телефона'));
        const numb = document.createElement('div');
        numb.classList.add('number');
        numb.appendChild(this.createReadInput('+7','readonlyNum'));
        numb.appendChild(this.createInput('tel', '999-999-99-99', 'numb'));
        cont.appendChild(numb);
        form.appendChild(cont);
        form.appendChild(this.createPassword('pass', 'password', 'Пароль'));
        form.appendChild(this.createPassword('pass', 'password', 'Повторите пароль'));
        form.appendChild(this.createElem('next','button', 'nextButton', 'Далее'));
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
        return div
    }
    createReadInput(value, inputClasses){
        const input = document.createElement('input');
        input.readOnly = true;
        input.value = value;
        input.classList.add(inputClasses);
        return input
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
        return label
    }
    createPassword(divClass, inputClass, placeholder) {
        const div = document.createElement("div");
        div.classList.add(divClass);
        div.appendChild(this.createInput('', placeholder, inputClass));
        return div;
    }
}