import FirstStep from './FirstStep.hbs';
import Name from './Name.hbs'
import { DateOfBirth } from './DateOfBirth'
import Sex from './Sex.hbs'
import AboutMePart1 from './AboutMePart1.hbs'
import AboutMePart2 from './AboutMePart2.hbs'
import AboutMe from './AboutMe.hbs'
import Photo from './Photo.hbs'
import { Education } from './AboutMe'

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
                this.#parent.innerHTML += AboutMePart1();
                // this.#parent.innerHTML += AboutMe();
               (new Education(this.#parent)).render().then(([label, div, divsec]) => {
                    this.#parent.append(label,div, divsec);
            });
                this.#parent.innerHTML += AboutMePart2();
                // this.#parent.append(((new Education(this.#parent)).render()));


                    // document.getElementById('radio1').addEventListener('click', (evt) => {
                    //     console.log('1');
                    //     const div = document.getElementById('education_univ');
                    //     div.innerHTML = '<label class="nameFormText">Я учусь</label>' +
                    //         '<div class="pass"><textarea placeholder="МГТУ им. Н.Э.Баумана" class="education" id="univer" name="univer"></textarea></div>'
                    // });
                    //
                    // document.getElementById('radio2').addEventListener('click', (evt) => {
                    //     console.log('2');
                    //     const div = document.getElementById('education_univ');
                    //     div.innerHTML = '<label class="nameFormText">Я окончил</label>' +
                    //         '<div class="pass"><textarea placeholder="МГТУ им. Н.Э.Баумана" class="education" id="univer" name="univer"></textarea></div>';
                    // });
                    //
                    // document.getElementById('radio3').addEventListener('click', (evt) => {
                    //     console.log('3');
                    //     const div = document.getElementById('education_univ');
                    //     div.innerHTML = '';
                    // });


                break;
            case 'Photo':
                this.#parent.classList.remove('inner-formInf');
                this.#parent.classList.add('inner-formView');
                this.#parent.innerHTML += Photo();
                break;
        }
    }

}