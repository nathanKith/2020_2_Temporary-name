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

        document
            .getElementById('save-button')
            .addEventListener(this.#data.event.save.type, this.#data.event.save.listener);
        document
            .getElementById('logout')
            .addEventListener(this.#data.event.logout.type, this.#data.event.logout.listener);
    }
}