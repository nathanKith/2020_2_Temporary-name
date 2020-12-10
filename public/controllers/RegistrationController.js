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
        console.log('listenerRegistration');
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

        if (document.getElementById('file').files[0].size > 3000000) {
            mes.innerHTML = 'Слишком большой размер фото, пожалуйста, загрузите фото размером меньше 3Мб';
            console.log('Слишком большой размер фото, пожалуйста, загрузите фото размером меньше 3Мб');
            return false;
        }

        const button = document.getElementById('end');
        button.disabled = true;

        await model.registration(document.getElementById('form-photo'))
            .then(({status, responseObject}) => {
                if (status === 200) {
                    router.redirect('/login');
                } else {
                    throw Error('Неизвестная ошибка, пожалуйста, попробуйте позже');
                }
            })
            .catch( (err) => {
                mes.innerHTML = err.message;
            })
        button.disabled = false;
        console.log(mes);
    }

    async listenerCheckNumber() {
        const number = document.getElementById('number').value;
        return await this.RegAuthModel.checkNumber(number);
    }
}