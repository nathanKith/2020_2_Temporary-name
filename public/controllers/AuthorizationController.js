import {router} from '../main';
import {isMobile} from '../modules/resizing';

export class AuthorizationController {
    authorizationView
    authorizationModel

    constructor(authorizationView, authorizationModel) {
        this.authorizationModel = authorizationModel;
        this.authorizationView = authorizationView;
        this.authorizationView.model = this.authorizationModel;
        this.authorizationView.listenerAuthorization = this.authorizeListener.bind(this);

        this.authorizationView.validationNumberPassword = this.validationNumberPassword.bind(this);

        this.authorizationView.checkNumber = this.checkNumber.bind(this);
    }

    control() {
        this.authorizationView.render();
    }

    async checkNumber(number) {
        const {responseObject} = await this.authorizationModel.checkNumber(number);
        if (responseObject['telephone']) {
            return;
        }

        return 'Нет пользователя с таким номером телефона.';
    }

    validationNumberPassword(number, password) {
        //const mes = document.getElementById('mes');
        const telephone = document.getElementById('number');
        if (telephone.value.length !== 15) {
            return 'Неверно введен номер телефона';
        }
        const [message, result] = this.authorizationModel.setTelephonePasswordAuth(
            number,
            //password,
        );
        if (!result) {
            return message;
        }

        return null;
    }

    async listenerAuthorization(model) {
        const mes = document.getElementById('mes');
        const telephone = document.getElementById('number');
        if (telephone.value.length !== 15) {
            mes.innerHTML = 'Неверно введен номер телефона';
            return;
        }
        const [message, result] = model.setTelephonePasswordAuth(
            document.getElementById('number').value,
            //document.getElementById('password').value
        );
        if (!result) {
            mes.innerHTML = message;
            return false;
        }

        const button = document.getElementById('sign-in-button');
        button.disabled = true;

        await model.authorization()
            .then( () => {
                if (document.documentElement.clientWidth < 1024) {
                    router.redirect('/mfeed');
                } else {
                    router.redirect('/feed');   
                }
                // button.disabled = false;
            })
            .catch( (err) => {
                button.disabled = false;
                console.log(err.message);
                mes.innerHTML = 'Неверный пароль';
            });
    }

    async authorizeListener(phoneNumber) {
        const button = document.getElementById('sign-in-button');
        button.disabled = true;

        this.authorizationModel.setTelephonePasswordAuth(
            phoneNumber,
            //password,
        );
        await this.authorizationModel.authorization()
            .then(({status, responseObject}) => {
                if (status === 500) {
                    throw new Error('Какие-то неожиданные проблемы.');
                }

                if (status === 401) {
                    throw new Error('Нет пользователя с таким номером телефона');
                }

                if (isMobile()) {
                    router.redirect('/mfeed');
                    return;
                }

                router.redirect('/feed');
            })
            .catch((err) => {
                document.querySelector('#mes').innerHTML = err.message;
            });
    }
}
