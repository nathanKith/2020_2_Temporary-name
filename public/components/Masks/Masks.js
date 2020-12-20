import './Masks.css';
import MasksTemplate from './Masks.hbs';

export class Masks {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.insertAdjacentHTML('beforeend', MasksTemplate());
    }
}
