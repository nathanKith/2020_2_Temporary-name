import {RegAuthModel} from "../models/RegAuthModel";
import {RegistrationView} from "../views/RegistrationView";
import {router} from "../main";


export class RegistrationController {
    RegAuthModel
    registrationView

    constructor(registrationView, registrationModel) {
        this.RegAuthModel = registrationModel;
        this.registrationView = registrationView;
        this.registrationView.model = this.RegAuthModel;
        this.registrationView.listenerRegistration = this.listenerRegistration
                                                         .bind(this.listenerRegistration, this.RegAuthModel);
        this.registrationView.listenerCheck = this.listenerCheckNumber.bind(this);
    }

    control() {
        this.registrationView.render();
    }

    async listenerRegistration(model) {
        console.log('aaaa');
        let photo;
        photo = document.getElementById('file').value;

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
            .then( () => {
                router.redirect('/login');
            })
            .catch( (status) => {
                console.log(status);
                if (status === '400') {
                    mes.innerHTML = 'Слишком большой размер фото, пожалуйста, загрузите фото меньшего размера';
                }
                if (status === '500') {
                    mes.innerHTML = 'Неизвестная ошибка, пожалуйста, попробуйте позже';
                }
                //redirect
            })
        console.log(mes);
    }

    async listenerCheckNumber() {
        const number = document.getElementById('number').value;
        return await this.RegAuthModel.checkNumber(number);
    }
}