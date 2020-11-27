class Backend {
    #url
    #api
    #websocket

    constructor() {
        this.#url = 'http://95.163.213.222:8080';
        this.#api = '/api/v1';
        this.#websocket = 'ws://95.163.213.222:8080';
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

    get chatId() {
        return this.#url + this.#api + '/chats/';
    }

    get chats(){
        return this.#url + this.#api + '/chats';
    }

    get websocket() {
        return this.#websocket + this.#api + '/gochat';
    }
    
    get like() {
        return this.#url + this.#api + '/like';
    }

    get dislike() {
        return this.#url + this.#api + '/dislike';
    }

    get logout() {
        return this.#url + this.#api + '/logout';
    }

    get settings() {
        return this.#url + this.#api + '/settings';
    }
    get commentsById() {
        return this.#url + this.#api + '/comments/';
    }

    get comment() {
        return this.#url + this.#api + '/comment';
    }

    avatar = (name) => {
        return this.#url + name;
    }

    get removePhoto() {
        return this.#url + this.#api + '/remove_photo';
    }

    get telephone(){
        return this.#url + this.#api + '/telephone';
    }

}

export const backend = new Backend();
