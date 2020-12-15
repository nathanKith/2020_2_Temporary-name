import { BaseView } from './BaseView';
import { AuthorizationContent } from '../components/AuthorizationContent/AuthorizationContent';
import { LandingHeader } from '../components/LandingHeader/LandingHeader';
import { mask, maskCode } from '../modules/mask';
import { popupLanding } from '../modules/popupLanding';
import { AuthVerification } from '../components/AuthVerification/AuthVerification';
import { generateRecaptcha, sendSms, loginWithCode } from '../modules/firebase';


export class AuthorizationView extends BaseView {
    model
    divFormView
    listenerAuthorization
    validationNumberPassword
    checkNumber

    constructor(app) {
        super(app);
    }

    renderBase = () => {
        document.body.classList.add('landing-body-background');
        this._app.innerHTML = '';
        this._app.classList.add('registration-body-background');

        (new LandingHeader(this._app)).render();

        const div = document.createElement('div');
        div.classList.add('formView');
        this._app.appendChild(div);

        const divFormView = document.createElement('div');
        divFormView.classList.add('inner-formView');
        div.appendChild(divFormView);

        const footer = document.createElement('footer');
        footer.classList.add('landing-footer');
        this._app.appendChild(footer);

        divFormView.addEventListener('click', (evt) => {
            evt.stopPropagation();
        });
        this._app.addEventListener('click', popupLanding);

        return divFormView;
    }

    render() {
        this.divFormView = this.renderBase();

        const Form = document.createElement('form');
        Form.classList.add('form');
        Form.addEventListener('submit', this.renderVerification.bind(this));

        const form = this.divFormView.appendChild(Form);

        (new AuthorizationContent(form)).render();

        const number = document.getElementById('number');

        number.addEventListener('input', mask);
        number.addEventListener('focus', mask);
        number.addEventListener('blur', mask);

        const button = document.getElementById('next');
        button.type = 'submit';

        // button.addEventListener('click', this.listenerAuthorization);

        const cancel = document.getElementsByClassName('cancelButton')[0];
        cancel.addEventListener('click', popupLanding);
    }

    async renderVerification(evt) {
        evt.preventDefault();

        const telephone = document.querySelector('#number').value;
        const password = document.querySelector('#password').value;

        const validationMessage = this.validationNumberPassword(telephone, password);
        if (validationMessage) {
            document.querySelector('#mes').innerHTML = validationMessage;
            return;
        }

        const haveNumber = await this.checkNumber(telephone);
        console.log(haveNumber);
        if (haveNumber) {
            document.querySelector('#mes').innerHTML = haveNumber;
            return;
        }


        this.divFormView.innerHTML = '';

        const Form = document.createElement('form');
        Form.classList.add('form');

        const form = this.divFormView.appendChild(Form);

        (new AuthVerification(form)).render();
        generateRecaptcha();

        try {
            const phoneNumber = '+7' + telephone.replaceAll(' ', '')
                .replace('(', '')
                .replace(')', '');
            console.log(phoneNumber);

            sendSms(phoneNumber, window.recaptcha);
        } catch (err) {
            console.log(err.message);
            grecaptcha.reset(widgetId);
        }

        const codeInput = document.querySelector('#code-input');
        codeInput.addEventListener('input', maskCode);
        codeInput.addEventListener('focus', maskCode);
        codeInput.addEventListener('blur', maskCode);

        const button = document.getElementById('sign-in-button');
        button.type = 'submit';

        const cancel = document.getElementsByClassName('cancelButton')[0];
        cancel.addEventListener('click', popupLanding);

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            const code = document.querySelector('#code-input').value.replaceAll(' ', '');
            if (code.length !== 6) {
                document.querySelector('#mes').innerHTML = 'Неверный код';
            }

            loginWithCode(code)
                .then((result) => {
                    const user = result.user;
                    console.log('number:', user.phoneNumber, ' ', user.uid);
                    this.listenerAuthorization(telephone, password);
                })
                .catch((err) => {
                    document.querySelector('#mes').innerHTML = 'Неправильный код.';
                });
        });
    }
}
