import {RegAuthModel} from "../models/RegAuthModel";
import {RegistrationView} from "../views/RegistrationView";
import {router} from "../main";

export class AuthorizationController {
    authorizationView
    authorizationModel

    constructor(authorizationView, authorizationModel) {
        this.authorizationModel = authorizationModel;
        this.authorizationView = authorizationView;
        this.authorizationView.model = this.authorizationModel;
        this.authorizationView.listenerAuthorization = this.listenerAuthorization.bind
                                                        (this.listenerAuthorization, this.authorizationModel);
    }

    control() {
        this.authorizationView.render();
    }

    async listenerAuthorization(model) {
        const mes = document.getElementById('mes');
        const telephone = document.getElementById('number');
        if (!telephone.validity.valid) {
            mes.innerHTML = 'Неверно введен номер телефона';
            return;
        }
        const [message, result] = model.setTelephonePasswordAuth
                                        (document.getElementById('number').value,
                                         document.getElementById('password').value);
        if (!result) {
            mes.innerHTML = message;
            return false;
        }
        await model.authorization()
            .then( () => {
                //redirect on feed
                router.redirect('/feed');
            })
            .catch( (err) => {
                console.log(err.message);
                mes.innerHTML = 'Неверный пароль';
                // router.redirect('/');
            })
    }
}