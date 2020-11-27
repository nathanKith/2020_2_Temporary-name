import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';
import {UserModel} from "./UserModel";
import {feedPage} from "../main";

export class RegAuthModel extends UserModel{
    linkImage

    constructor() {
        super();
        this.linkImage = [];
    }

    validationPassword(validityNumber, password, repeatPassword) {
        if (validityNumber !== 15) {
            return ['Неверно введен номер телефона', false];
        }
        if (password === '' || repeatPassword === ''){
            return ['Введены не все поля', false];
        }
        if (password !== repeatPassword) {
            return ['Пароли не совпадают', false];
        }
        if (password === repeatPassword){
            return ['', true];
        }
    }

    validationAuth(number, password) {
        if (password === '' || number === ''){
            return ['Введены не все поля', false];
        }
        return ['', true];
    }

    setTelephonePasswordAuth(number, password){
        let [message, result] = this.validationAuth(number, password);
        if (result) {
            this.telephone = number;
            this.password = password;
        }
        return [message, result];
    }

    async authorization() {
        return await ajax.post(backend.login, this.JsonAuth())
            .then(({status, responseObject}) => {
                if (status !== 200) {
                    throw new Error(`${status} error auth: have not this user`);
                }
            })
    }

    JsonAuth() {
        return {
            telephone: this.telephone,
            password: this.password,
        }
    }

    setTelephonePassword(number, validityNumber, password, repeatPassword) {
        let [message, result] = this.validationPassword(validityNumber, password, repeatPassword);
        if (!result) {
            return [message, result];
        }
        this.telephone = number;
        this.password = password;
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
        }
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
                } else {
                    throw new Error(`${status}`);
                }
                return photo_name;
            })
            .then( (photo) => {
                ajax.post(backend.signup, this.Json());
            })


        // await ajax.post(backend.signup, this.Json())
        //     .then( ({status, responseObject}) => {
        //         let string;
        //         if (status === 401) {
        //             string = new Promise((resolve, reject) => {
        //                 reject('Такой пользователь уже зарегистрирован!');
        //             });
        //         }
        //         if (status === 200 ) {
        //             string = new Promise((resolve, reject) => {
        //                 resolve('Успешно зарегистрировались!');
        //             });
        //         }
        //         return string;
        //     }).then( (string) => {
        //         ajax.post(backend.upload, new FormData(Form), true)
        //             .then(({status, responseObject}) => {
        //                 let photo_name;
        //                 if (status === 200 ) {
        //                     photo_name = new Promise((resolve, reject) => {
        //                         resolve(JSON.stringify(responseObject));
        //                         console.log(JSON.stringify(responseObject));
        //                     });
        //                     console.log(photo_name);
        //                 } else {
        //                   throw new Error(`${status} error upload: cannot upload file on back`);
        //                 }
        //                 return photo_name;
        //             }).then ( (photo_name) => {
        //             const link_photo = "http://95.163.213.222:8080/static/avatars/";
        //             console.log(link_photo + photo_name.replaceAll('"', ''));
        //             const photoAdd = {
        //                 telephone: this.telephone,
        //                 linkImages: link_photo + photo_name.replaceAll('"', ''),
        //             }
        //             ajax.post(backend.addPhoto, photoAdd)
        //                 .then(({status, responseObject}) => {
        //                 if (status !== 200 ) {
        //                     throw new Error(`${status} error adding: cannot add photo on back`);
        //                 }
        //                 });
        //         })
        //     });
    }


    async checkNumber(number) {
        return await ajax.post(backend.telephone, {
            telephone: number,
        });
    }
}