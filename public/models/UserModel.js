import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';

export class UserModel {
    #id
    #name
    #telephone
    #password
    #day
    #month
    #year
    #sex
    #job
    #education
    #aboutMe
    #linkImages
    #age

    constructor() {
        this.#id = null;
        this.#name = null;
        this.#telephone = null;
        this.#password = null;
        this.#day = null;
        this.#month = null;
        this.#year = null;
        this.#sex = null;
        this.#job = null;
        this.#education = null;
        this.#aboutMe = null;
        this.#linkImages = null;
        this.#age = null;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name.toString();
    }

    get telephone() {
        return this.#telephone;
    }

    set telephone(telephone) {
        this.#telephone = telephone.toString();
    }

    get password() {
        return this.#password;
    }

    set password(password) {
        this.#password = password.toString();
    }

    get day() {
        return this.#day;
    }

    set day(day) {
        this.#day = day.toString();
    }

    get month() {
        return this.#month;
    }

    set month(month) {
        this.#month = month.toString();
    }

    get year() {
        return this.#year;
    }

    set year(year) {
        this.#year = year.toString();
    }

    get sex() {
        return this.#sex;
    }

    set sex(sex) {
        this.#sex = sex.toString();
    }

    get job() {
        return this.#job;
    }

    set job(job) {
        this.#job = job.toString();
    }

    get education() {
        return this.#education;
    }

    set education(education) {
        this.#education = education.toString();
    }

    get aboutMe() {
        return this.#aboutMe;
    }

    set aboutMe(aboutMe) {
        this.#aboutMe = aboutMe.toString();
    }

    get linkImages() {
        return this.#linkImages;
    }

    #fillUserData(data) {
        this.#id = data['account_id'];
        this.#telephone = data['telephone'];
        this.#education = data['education'];
        this.#job = data['job'];
        this.#aboutMe = data['aboutMe'];
        this.#sex = data['sex'];
        this.#linkImages = data['linkImages'];
        this.#name = data['name'];
        this.#age = data['age'];
        this.#day = data['day'];
        this.#month = data['month'];
        this.#year = data['year'];
        this.#password = data['password'];
    }

    async getMe() {
        await ajax.get(backend.me)
            .then(({status, responseObject}) => {
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot get json on url /me`);
                }
                this.#fillUserData(responseObject);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    async getFeed() {
        await ajax.get(backend.feed)
            .then(({status, responseObject}) => {
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot get json on url /feed`);
                }
                this.#fillUserData(responseObject);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}