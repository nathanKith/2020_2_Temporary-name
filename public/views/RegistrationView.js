import {BaseView} from './BaseView';
import {RegistrationTop} from '../components/RegistrationTop/Top';
import {RegistrationContent} from '../components/RegistrationContent/RegistrationContent';
import {RegistrationButton} from '../components/RegistrationButton/RegistrationButton';
import './../components/Registration/Registration.css';
import {LandingHeader} from '../components/LandingHeader/LandingHeader';
import {mask, maskCode} from '../modules/mask';
import {readImage} from  '../modules/previewAvatar';
import {popupLanding} from '../modules/popupLanding';
import {AuthVerification} from '../components/AuthVerification/AuthVerification';
import {generateRecaptcha, loginWithCode, sendSms} from '../modules/firebase';


export class RegistrationView extends BaseView {
    model
    listenerRegistration
    divFormView
    listenerCheck

    constructor(app) {
        super(app);
    }



    renderBase = () => {
        this._app.innerHTML = '';
        document.body.classList.remove('landing-body-background');

        document.body.classList.add('landing-body-background');
        this._app.classList.add('registration-body-background');

        (new LandingHeader(this._app)).render();

        const div = document.createElement('div');
        div.classList.add('formView');
        this._app.appendChild(div);

        const divFormView = document.createElement('div');
        divFormView.classList.add('inner-formView');
        div.appendChild(divFormView);


        // if (screenWidth > 450) {
        //     console.log('2')
        const footer = document.createElement('footer');
        footer.classList.add('landing-footer');
        this._app.appendChild(footer);
        // }

        divFormView.addEventListener('click', (evt) => {
            evt.stopPropagation();
        });
        this._app.addEventListener('click', popupLanding);

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

        const number = document.getElementById('number');
        number.addEventListener('input', mask, false);
        number.addEventListener('focus', mask, false);
        number.addEventListener('blur', mask, false);

        Form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const mes = document.getElementById('mes');
            const [message, result] = this.model.setTelephonePassword(number.value, number.value.length);
                //document.getElementById('password').value,
                //document.getElementById('repeat-password').value);
            if (!result) {
                mes.innerHTML = message;
                return;
            }
            console.log('Хаве доневалидатион');
            console.log(this);
            this.listenerCheck()
                .then( async ({status, responseObject}) => {
                    console.log(responseObject);
                    if (!responseObject['telephone']) {
                        //this.renderName();
                        await this.renderVerification();
                    } else {
                        throw new Error('Такой номер уже существует');
                    }
                }).catch( (err) => {
                    mes.innerHTML = err.message;
                    return;
                });
        });


        const button = document.getElementById('nextButton');
        button.type = 'submit';

        const cancel = document.getElementsByClassName('cancelButton')[0];
        cancel.addEventListener('click', popupLanding);
    }

    async renderVerification() {
        //evt.preventDefault();

        const telephone = document.querySelector('#number').value;
        //const password = document.querySelector('#password').value;

        // const validationMessage = this.validationNumberPassword(telephone, password);
        // if (validationMessage) {
        //     document.querySelector('#mes').innerHTML = validationMessage;
        //     return;
        // }
        //
        // const haveNumber = await this.checkNumber(telephone);
        // console.log(haveNumber);
        // if (haveNumber) {
        //     document.querySelector('#mes').innerHTML = haveNumber;
        //     return;
        // }


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
                return;
            }

            //button.disabled = true;

            loginWithCode(code)
                .then((result) => {
                    const user = result.user;
                    console.log('number:', user.phoneNumber, ' ', user.uid);
                    this.renderName();
                    //this.listenerAuthorization(telephone, password);
                })
                .catch((err) => {
                    document.querySelector('#mes').innerHTML = 'Неправильный код.';
                });
        });
    }

    renderName = () => {
        this.divFormView.innerHTML = '';

        const Form = document.createElement('form');
        Form.classList.add('form');
        Form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const mes = document.getElementById('mes');
            const [message, result] = this.model.setName(document.getElementById('miami-name').value);
            if (!result) {
                mes.innerHTML = message;
                return;
            }
            this.renderBirth();
        });

        const form = this.divFormView.appendChild(Form);

        (new RegistrationTop(form)).render('Top','Расскажите о себе:');
        (new RegistrationContent(form)).render('Name');
        (new RegistrationButton(form)).render();

        const button = document.getElementById('nextButton');
        button.type = 'submit';
        // button.addEventListener('click', (evt) => {
        //     evt.preventDefault();
        //     const mes = document.getElementById('mes');
        //     const [message, result] = this.model.setName(document.getElementById('miami-name').value);
        //     if (!result) {
        //         mes.innerHTML = message;
        //         return;
        //     }
        //     this.renderBirth();
        // });

        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.render();
        });

        const cancel = document.getElementsByClassName('cancelButton')[0];
        cancel.addEventListener('click', popupLanding);
    }

    renderBirth = () => {
        this.divFormView.innerHTML = '';

        const Form = document.createElement('form');
        Form.classList.add('form');
        Form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.model.setDay(document.getElementById('day').value);
            this.model.setMonth(document.getElementById('month').value);
            this.model.setYear(document.getElementById('year').value);
            this.renderSex();
        });

        const form = this.divFormView.appendChild(Form);

        (new RegistrationTop(form)).render('Top','Расскажите о себе:');
        (new RegistrationContent(form)).render('DateOfBirth');
        (new RegistrationButton(form)).render();

        const button = document.getElementById('nextButton');

        button.type = 'submit';

        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderName();
        });

        const cancel = document.getElementsByClassName('cancelButton')[0];
        cancel.addEventListener('click', popupLanding);
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

        const button = document.getElementById('female');
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.model.setSex('female');
            this.renderAboutMe();
        });

        const button2 = document.getElementById('male');
        button2.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.model.setSex('male');
            this.renderAboutMe();
        });

        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderBirth();
        });

        const cancel = document.getElementsByClassName('cancelButton')[0];
        cancel.addEventListener('click', popupLanding);
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

                const button = document.getElementById('nextButton');
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
        });

        const button = document.getElementById('skip');
        button.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderPhoto();
        });

        const cancel = document.getElementsByClassName('cancelButton')[0];
        cancel.addEventListener('click', popupLanding);
    }

    renderPhoto = () => {
        this.divFormView.innerHTML = '';

        console.log(this.model.Json());
        (new RegistrationContent(this.divFormView)).render('Photo');



        const photo = document.getElementById('file');
        photo.onchange = () => {
            const file = document.getElementById('file').files[0];
            readImage(file);
        };


        const back = document.getElementById('arrow');
        back.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.renderAboutMe();
        });

        const button = document.getElementById('end');
        button.onclick = this.listenerRegistration;

        const cancel = document.getElementsByClassName('cancelButton')[0];
        cancel.addEventListener('click', popupLanding);
    }

    validationAboutMe (univer) {
        if (univer) {
            return univer.value;
        }
        return null;
    }
}