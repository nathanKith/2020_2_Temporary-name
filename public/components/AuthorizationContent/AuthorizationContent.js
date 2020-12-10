import Authorization from './AuthorizationContent.hbs';


export class AuthorizationContent {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }
    render = () => {
        this.#parent.insertAdjacentHTML('beforeend', Authorization());
    }
}