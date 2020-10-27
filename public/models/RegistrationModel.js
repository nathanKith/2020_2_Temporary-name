import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';
import {UserModel} from "./UserModel";

export class RegistrationModel extends UserModel{
    constructor() {
        super();
    }

    validationPassword(validityNumber, password, repeatPassword) {
        if (!validityNumber) {
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

    setTelephonePassword(number, validityNumber, password, repeatPassword) {
        let [message, result] = this.validationPassword(validityNumber, password, repeatPassword);
        if (!result) {
            return [message, result];
        }
        this.telephone = number;
        this.password = password;
        return ['', true];
    }

    setName (name) {
        let [message, result] = this.validationName(name);
        if (!result) {
            return [message, result];
        }
        this.name = name;
    }

    validationName(name) {
        if (name === '') {
            return ['Введите имя', false];
        }
        return ['', true];
    }

    validationAboutMe (univer) {
        if (univer) {
            return univer.value;
        }
        return null;
    }

    setAboutMe (job, univer, aboutMe) {
        const nameOfUniver = this.validationAboutMe(univer);
        if (nameOfUniver) {
            this.education = nameOfUniver;
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
        }
    }
}