import landingContent from './LandingContent.hbs';
import './LandingContent.css';

export class LandingContent {
    #parent

    constructor(parent) {
        this.#parent = parent
    }

    render() {
        this.#parent.innerHTML += landingContent();
    }
}
