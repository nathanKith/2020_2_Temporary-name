import {BaseView} from './BaseView';
import {RegistrationTop} from "../components/RegistrationTop/Top";
import {RegistrationContent} from "../components/RegistrationContent/RegistrationContent";
import {RegistrationButton} from "../components/RegistrationButton/RegistrationButton";
import './../components/Registration/Registration.css'
import {RegAuthModel} from "../models/RegAuthModel";
import {LandingHeader} from "../components/LandingHeader/LandingHeader";
import {RegistrationController} from "../controllers/RegistrationController";


export class RegistrationView extends BaseView {
    model
    listenerRegistration
    divFormView

    constructor(app) {
        super(app);
    }

    renderBase = () => {
        document.body.classList.add('landing-body-background');
        this._app.innerHTML = '';
        this._app.classList.add('registration-body-background');

        const header = new LandingHeader(this._app).render();

        const div = document.createElement('div');
        div.classList.add('formView');
        this._app.appendChild(div);

        const divFormView = document.createElement('div');
        divFormView.classList.add('inner-formView');
        div.appendChild(divFormView);

        const footer = document.createElement('footer');
        footer.classList.add('landing-footer');
        this._app.appendChild(footer);

        return divFormView;
    }

    render = () => {
        this.divFormView = this.renderBase();

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.divFormView.appendChild(Form);

        (new RegistrationTop(form)).render('TopBegin','Регистрация');
        (new RegistrationContent(form)).render('FirstStep');
        (new RegistrationButton(form)).render();

        const button = document.getElementById('nextButton')
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            const number = document.getElementById('number');
            const mes = document.getElementById('mes');
            const [message, result] = this.model.setTelephonePassword(number.value, number.validity.valid,
                document.getElementById('password').value,
                document.getElementById('repeat-password').value);
            if (!result) {
                mes.innerHTML = message;
                return;
            }
            this.renderName();
        })
    }

    renderName = () => {
        this.divFormView.innerHTML = '';

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.divFormView.appendChild(Form);

        (new RegistrationTop(form)).render('Top','Расскажите о себе:');
        (new RegistrationContent(form)).render('Name');
        (new RegistrationButton(form)).render();

        const button = document.getElementById('nextButton');
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            const mes = document.getElementById('mes');
            const [message, result] = this.model.setName(document.getElementById('miami-name').value);
            if (!result) {
                mes.innerHTML = message;
                return;
            }
            this.renderBirth();
        });

        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.render();
        });
    }

    renderBirth = () => {
        this.divFormView.innerHTML = '';

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.divFormView.appendChild(Form);

        (new RegistrationTop(form)).render('Top','Расскажите о себе:');
        (new RegistrationContent(form)).render('DateOfBirth');
        (new RegistrationButton(form)).render();

        const button = document.getElementById('nextButton')
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.model.setDay(document.getElementById('day').value);
            this.model.setMonth(document.getElementById('month').value);
            this.model.setYear(document.getElementById('year').value);
            this.renderSex();
        });

        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderName();
        });
    }

    renderSex = () => {
        this.divFormView.innerHTML = '';
        this.divFormView.classList.remove('inner-formInf');
        this.divFormView.classList.add('inner-formView');

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.divFormView.appendChild(Form);

        (new RegistrationTop(form)).render('Top','Расскажите о себе:');
        (new RegistrationContent(form)).render('Sex');

        const button = document.getElementById('female')
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.model.setSex('female');
            this.renderAboutMe();
        });

        const button2 = document.getElementById('male')
        button2.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.model.setSex('male');
            this.renderAboutMe();
        });

        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderBirth();
        })
    }

    renderAboutMe = () => {
        this.divFormView.innerHTML = '';

        this.divFormView.classList.remove('inner-formView');
        this.divFormView.classList.add('inner-formInf');

        const Form = document.createElement('form');
        Form.classList.add('formInf');
        const form = this.divFormView.appendChild(Form);

        (new RegistrationTop(form)).render('TopAbout');
        (new RegistrationContent(form)).render('AboutMe')
            .then( () => {
                (new RegistrationButton(form)).render();

                const button = document.getElementById('nextButton')
                button.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    let education = this.validationAboutMe( document.getElementById('univer'));
                    this.model.setAboutMe(document.getElementById('job').value,
                        education,
                        document.getElementById('about').value);
                    this.renderPhoto();
                });
            });
        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderSex();
        })

        const button = document.getElementById('skip')
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderPhoto();
        });
    }

    renderPhoto = () => {
        this.divFormView.innerHTML = '';

        console.log(this.model.Json());
        (new RegistrationContent(this.divFormView)).render('Photo');

        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderAboutMe();
        })

        const button = document.getElementById('end');
        // button.addEventListener('click', this.listenerRegistration);
        // button.addEventListener('click', {handleEvent: this.listenerRegistration,
        //     model: this.model});
        // button.addEventListener('click',this.listenerRegistration.bind(this.model));
        // button.addEventListener('click', (evt) => {
        //     evt.preventDefault();
        //     this.listenerRegistration(this.model);
        // });
        button.onclick = this.listenerRegistration;
    }

    validationAboutMe (univer) {
        if (univer) {
            return univer.value;
        }
        return null;
    }
}