import {BaseView} from './BaseView';
import {RegistrationTop} from "../components/RegistrationTop/Top";
import {RegistrationContent} from "../components/RegistrationContent/RegistrationContent";
import {RegistrationButton} from "../components/RegistrationButton/RegistrationButton";
import './../components/Registration/Registration.css'
import {RegistrationModel} from "../models/RegistrationModel";


export class RegistrationView extends BaseView {
    model
    constructor(app, model = new RegistrationModel()) {
        super(app);
        this.model = model;
    }

    render = () => {
        this._app.innerHTML = '';

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this._app.appendChild(Form);

        (new RegistrationTop(form)).render('TopBegin','Регистрация');
        (new RegistrationContent(form)).render('FirstStep');
        (new RegistrationButton(form)).render();

        const button = document.getElementById('nextButton')
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            const number = document.getElementById('number');
            const mes = document.getElementById('mes');
            const [message, result] = this.model.setTelephonePassword(number, number.validity.valid,
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
        this._app.innerHTML = '';

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this._app.appendChild(Form);

        (new RegistrationTop(form)).render('Top','Расскажите о себе:');
        (new RegistrationContent(form)).render('Name');
        (new RegistrationButton(form)).render();

        const button = document.getElementById('nextButton');
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            const mes = document.getElementById('mes');
            const [message, result] = this.model.setName(document.getElementById('miami-name'));
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
        this._app.innerHTML = '';

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this._app.appendChild(Form);

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
        this._app.innerHTML = '';
        this._app.classList.remove('inner-formInf');
        this._app.classList.add('inner-formView');

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this._app.appendChild(Form);

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
        this._app.innerHTML = '';

        this._app.classList.remove('inner-formView');
        this._app.classList.add('inner-formInf');

        const Form = document.createElement('form');
        Form.classList.add('formInf');
        const form = this._app.appendChild(Form);

        (new RegistrationTop(form)).render('TopAbout');
        (new RegistrationContent(form)).render('AboutMe')
            .then( () => {
                (new RegistrationButton(form)).render();

                const button = document.getElementById('nextButton')
                button.addEventListener('click', (evt) => {
                    evt.preventDefault();
                    this.model.setAboutMe(document.getElementById('job').value,
                        document.getElementById('univer'),
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
        this._app.innerHTML = '';

        console.log(this.model.Json());
        (new RegistrationContent(this._app)).render('Photo');

        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderAboutMe();
        })
    }
}