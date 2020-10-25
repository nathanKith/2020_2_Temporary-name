import FirstStep from './FirstStep.hbs';
import Name from './Name.hbs'
import { DateOfBirth } from './DateOfBirth'
import Sex from './Sex.hbs'
import AboutMe from './AboutMe.hbs'
import Photo from './Photo.hbs'

export class RegistrationContent {
    #parent

    constructor(parent) {
        this.#parent = parent
    }

    render(name) {
        switch (name) {
            case 'FirstStep':
                this.#parent.innerHTML += FirstStep();
                break;
            case 'Name':
                this.#parent.innerHTML += Name();
                break;
            case 'DateOfBirth':
                this.#parent.appendChild((new DateOfBirth()).render());
                break;
            case 'Sex':
                this.#parent.innerHTML += Sex();
                break;
            case 'AboutMe':
                this.#parent.innerHTML += AboutMe();
                break;
            case 'Photo':
                this.#parent.innerHTML += Photo();
                break;
        }
    }
}