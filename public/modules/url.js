class Backend {
    #url
    #api

    constructor() {
        this.#url = 'http://95.163.213.222:8080';
        this.#api = '/api/v1';
    }

    get me() {
        return this.#url + this.#api + '/me';
    }

    get feed() {
        return this.#url + this.#api + '/feed';
    }

    get signup() {
        return this.#url + this.#api + '/signup';
    }

    get upload() {
        return this.#url + this.#api + '/upload';
    }

    get addPhoto() {
        return this.#url + this.#api + '/add_photo';
    }

    get login() {
        return this.#url + this.#api + '/login';
    }

    get like() {
        return this.#url + this.#api + '/like';
    }

    get dislike() {
        return this.#url + this.#api + '/dislike';
    }

    avatar = (name) => {
        return this.#url + name;
    }
}

export const backend = new Backend();
