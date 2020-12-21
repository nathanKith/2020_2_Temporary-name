import landingHeader from './LandingHeader.hbs';
import './LandingHeader.css';

export class LandingHeader {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML += landingHeader();
    }
}
