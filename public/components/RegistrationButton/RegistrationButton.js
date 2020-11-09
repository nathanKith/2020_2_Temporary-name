import Button from './Button.hbs'
import AboutMePart2 from "../RegistrationContent/AboutMePart2.hbs";

export class RegistrationButton {
    #parent
    constructor(parent) {
        this.#parent = parent;
    }
    render() {
        this.#parent.insertAdjacentHTML('beforeend', Button());
    }
}