
export class LandingHeader {
    #parent

    constructor(parent) {
        this.#parent = parent
    }

    render() {
        const header = document.createElement('header');
        header.classList.add('header');
        this.#parent.appendChild(header);
        header.appendChild(this.#createLeftSide());
        header.appendChild(this.#createRightSide());
    }

    #createLeftSide = () => {
        const div = document.createElement('div');
        div.classList.add('header-left-side');
        div.innerHTML += `<img src="./../../img/classic_label.png" class ="label" alt="габела"/>`;

        return div;
    }

    #createRightSide = () => {
        const div = document.createElement('div');
        div.classList.add('header-right-side');

        const loginLink = document.createElement('a');
        loginLink.href = '/login';
        loginLink.dataset.section = 'login';
        loginLink.innerHTML = 'Log in'
        loginLink.classList.add('login');

        div.appendChild(loginLink);

        const toggle = document.createElement('button');
        toggle.classList.add('toggle-menu');
        toggle.innerHTML = `<img src="../../img/menu_icon.svg" alt="МЕНЮ"/>`;
        div.appendChild(toggle);

        return div;
    }
}
