import {router} from '../main';

export class AuthorizationController {
    authorizationView
    authorizationModel

    constructor(authorizationView, authorizationModel) {
        this.authorizationModel = authorizationModel;
        this.authorizationView = authorizationView;
        this.authorizationView.model = this.authorizationModel;
        this.authorizationView.listenerAuthorization = this.listenerAuthorization.bind(
            this.listenerAuthorization,
            this.authorizationModel
        );
    }

    control() {
        this.authorizationView.render();
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
            document.getElementById('password').value
        );
        if (!result) {
            mes.innerHTML = message;
            return false;
        }
        const button = document.getElementById('next');
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
}