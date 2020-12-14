import AuthVerificationTemplate from './AuthVerification.hbs';
import './AuthVerification.css';

export class AuthVerification {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.innerHTML = '';
        this.#parent.insertAdjacentHTML('beforeend', AuthVerificationTemplate());
    }
}
