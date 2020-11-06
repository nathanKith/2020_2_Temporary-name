import './Settings.css';
import settingsTemplate from './Settings.hbs';

export class Settings {
    #parent
    #data

    constructor(parent) {
        this.#parent = parent;
    }

    set data(data) {
        this.#data = data;
    }

    render() {
        this.#parent.insertAdjacentHTML('afterbegin', settingsTemplate(this.#data.settings));
    }
}