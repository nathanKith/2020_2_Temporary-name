import {BaseView} from './BaseView';
import {TopBegin} from '../components/RegistrationTop/TopBegin';
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

        const button = document.getElementById('nextButton')
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderBirth();
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
            this.render();
        });
    }
}