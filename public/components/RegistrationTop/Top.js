import Top from './Top.hbs';
import TopAbout from './TopAbout.hbs';
import TopBegin from './TopBegin.hbs';

export class RegistrationTop {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render(topName, name) {
        switch (topName) {
        case 'Top':
            this.#parent.innerHTML += Top({name: name});
            break;
        case 'TopBegin':
            this.#parent.innerHTML += TopBegin({name: name});
            break;
        case 'TopAbout':
            this.#parent.innerHTML += TopAbout();
            break;
        }
    }
}
