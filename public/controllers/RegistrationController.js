import {RegistrationModel} from "../models/RegistrationModel";
import {RegistrationView} from "../views/RegistrationView";

export class RegistrationController {
    registrationModel
    registrationView
    constructor(app) {
        this.registrationModel = new RegistrationModel();
        this.registrationView = new RegistrationView(app, this.registrationModel,
            this.listenerRegistration.bind(this.listenerRegistration, this.registrationModel));
    }
    control(){
        this.registrationView.render();
    }
    async listenerRegistration(model) {
        console.log('aaaa');
        // evt.preventDefault();
        let photo;
        photo = document.getElementById('file').value;
        // if (document.getElementById('file')){
        //     photo = document.getElementById('file').value;
        // }
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
        // if (document.getElementById('mes')){
        //         mes = document.getElementById('mes');
        //         const [message, result] = model.validationPhoto(photo);
        //         if (!result) {
        //             mes.innerHTML = message;
        //             return;
        //         }
        // }

        await model.registration(document.getElementById('form-photo'))
            .catch( (err) => {
                console.log(err.message);
                // const endButton = document.getElementById('end');
                // endButton.href = '/';
                //redirect
            })
        console.log(mes);
    }
}