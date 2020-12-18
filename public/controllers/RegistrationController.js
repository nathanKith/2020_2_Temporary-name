import {router} from '../main';
import {isMobile} from "../modules/resizing";

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
        mes.innerHTML = 'Загружаем фото, пожалуйста, подождите';

        await model.registration(document.getElementById('form-photo'))
            .then(async ({status, responseObject}) => {
                if (status === 200) {
                    await model.authorization()
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
                } else {
                    throw Error('Неизвестная ошибка, пожалуйста, попробуйте позже');
                }
                button.disabled = false;
            })
            .catch( (err) => {
                mes.innerHTML = err.message;
                button.disabled = false;
            });
        console.log(mes);
    }

    async listenerCheckNumber() {
        const number = document.getElementById('number').value;
        return await this.RegAuthModel.checkNumber(number);
    }
}