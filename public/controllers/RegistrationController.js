import {RegAuthModel} from "../models/RegAuthModel";
import {RegistrationView} from "../views/RegistrationView";

export class RegistrationController {
    RegAuthModel
    registrationView

    constructor(registrationView, registrationModel) {
        this.RegAuthModel = registrationModel;
        this.registrationView = registrationView;
        this.registrationView.model = this.RegAuthModel;
        this.registrationView.listenerRegistration = this.listenerRegistration
                                                         .bind(this.listenerRegistration, this.RegAuthModel);
    }

    control() {
        this.registrationView.render();
    }

    async listenerRegistration(model) {
        console.log('aaaa');
        let photo;
        photo = document.getElementById('file').value;

        console.log(photo);
        let mes;
        mes = document.getElementById('mes');
        const [message, result] = model.validationPhoto(photo);
        if (!result) {
            mes.innerHTML = message;
            console.log(message);
            return false;
        }
        console.log(mes);

        await model.registration(document.getElementById('form-photo'))
            .catch( (err) => {
                console.log(err.message);
                const endButton = document.getElementById('end');
                endButton.href = '/';
                //redirect
            })
        console.log(mes);
    }
}