import Button from './Button.hbs';

export class RegistrationButton {
    #parent
    constructor(parent) {
        this.#parent = parent;
    }
    render() {
        this.#parent.insertAdjacentHTML('beforeend', Button());
    }
}