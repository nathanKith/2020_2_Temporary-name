import FirstStep from './FirstStep.hbs';
import Name from './Name.hbs';
import { DateOfBirth } from './DateOfBirth';
import Sex from './Sex.hbs';
import AboutMePart1 from './AboutMePart1.hbs';
import AboutMePart2 from './AboutMePart2.hbs';
import AboutMe from './AboutMe.hbs';
import Photo from './Photo.hbs';
import { Education } from './AboutMe';

export class RegistrationContent {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    async render(name) {
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
            this.#parent.innerHTML += AboutMePart1();
            // this.#parent.innerHTML += AboutMe();
            await (new Education(this.#parent)).render()
                .then(([label, div, divsec]) => {
                    this.#parent.append(label,div, divsec);
                }).then( () => {
                    this.#parent.insertAdjacentHTML('beforeend', AboutMePart2());
                });
            break;
        case 'Photo':
            this.#parent.classList.remove('inner-formInf');
            this.#parent.classList.add('inner-formView');
            this.#parent.innerHTML += Photo();
            break;
        }
    }

}