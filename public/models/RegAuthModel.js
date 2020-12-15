import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';
import {UserModel} from './UserModel';
import {isLoggedIn} from "../modules/firebase";

export class RegAuthModel extends UserModel{
    linkImage

    constructor() {
        super();
        this.linkImage = [];
        this.password = '';
    }

    validationPassword(validityNumber) {
        if (validityNumber !== 15) {
            return ['Неверно введен номер телефона', false];
        }
        // if (password === '' || repeatPassword === ''){
        //     return ['Введены не все поля', false];
        // }
        // if (password !== repeatPassword) {
        //     return ['Пароли не совпадают', false];
        // }
        // if (password === repeatPassword){
        //     return ['', true];
        // }
        return ['', true];
    }

    validationAuth(number) {
        if (number === ''){
            return ['Введены не все поля', false];
        }
        return ['', true];
    }

    setTelephonePasswordAuth(number){
        let [message, result] = this.validationAuth(number);
        if (result) {
            this.telephone = number;
            // this.password = password;
        }
        return [message, result];
    }

    async authorization() {
        const data = await this.JsonAuth();
        return await ajax.post(backend.login, data);
    }

    async JsonAuth() {
        console.log('Я В СТАТУ АУФ');
        const statusAuth = await isLoggedIn();
        console.log(statusAuth);
        return {
            telephone: this.telephone,
            password: this.password,
            is_logged_in: statusAuth,
        };
    }

    setTelephonePassword(number, validityNumber) {
        let [message, result] = this.validationPassword(validityNumber);
        if (!result) {
            return [message, result];
        }
        this.telephone = number;
        //this.password = password;
        return ['', true];
    }

    validationName(name) {
        if (name === '') {
            return ['Введите имя', false];
        }
        return ['', true];
    }

    setName (name) {
        let [message, result] = this.validationName(name);
        if (!result) {
            return [message, result];
        }
        this.name = name;
        return ['', true];
    }


    validationPhoto(photo) {
        if (!photo) {
            return ['Выберите фото', false];
        }
        return ['', true];
    }

    setAboutMe (job, univer, aboutMe) {
        if (univer) {
            this.education = univer;
        }
        this.job = job;
        this.aboutMe = aboutMe;
    }

    setDay(day) {
        this.day = day;
    }

    setMonth(month) {
        this.month = month;
    }

    setYear(year) {
        this.year = year;
    }

    setSex(sex) {
        this.sex = sex;
    }

    Json(){
        return {
            telephone: this.telephone,
            password: this.password,
            name: this.name,
            day: this.day,
            month: this.month,
            year: this.year,
            sex: this.sex,
            job: this.job,
            education: this.education,
            aboutMe: this.aboutMe,
            linkImages: this.linkImage,
        };
    }

    async registration(Form) {
        console.log('ajax post');
        return await ajax.post(backend.upload, new FormData(Form), true)
            .then(({status, responseObject}) => {
                let photo_name;
                if (status === 200 ) {
                    photo_name = new Promise((resolve, reject) => {
                        resolve(JSON.stringify(responseObject));
                        this.linkImage.push(responseObject.replaceAll('"', ''));
                    });
                    console.log(photo_name);
                    return ajax.post(backend.signup, this.Json());
                }

                if (status === 400) {
                    throw new Error('Слишком большой размер фото, пожалуйста, загрузите фото меньшего размера');
                    
                }

                if (status === 500) {
                    throw new Error('Неизвестная ошибка, пожалуйста, попробуйте позже');
                }
            });
    }


    async checkNumber(number) {
        console.log('checkNumber');
        return await ajax.post(backend.telephone, {
            telephone: number,
        });
    }
}