import {BaseView} from './BaseView';
import {RegistrationTop} from "../components/RegistrationTop/Top";
import {RegistrationContent} from "../components/RegistrationContent/RegistrationContent";
import {RegistrationButton} from "../components/RegistrationButton/RegistrationButton";


export class RegistrationView extends BaseView {
    constructor(app = document.getElementById('application')) {
        super(app);
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
            this.renderAboutMe();
        });

        const button2 = document.getElementById('male')
        button2.addEventListener('click', (evt) => {
            evt.preventDefault();
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

        (new RegistrationContent(this._app)).render('Photo');

        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderAboutMe();
        })
    }
}