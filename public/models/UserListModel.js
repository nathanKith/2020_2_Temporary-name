import {UserModel} from './UserModel';
import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';

export class UserListModel {
    #userListModel
    #userListJson

    constructor() {
        this.#userListJson = null;
        this.#userListModel = [];
    }

    async update() {
        this.#getUsers();
    }

    async #getUsers() {
        await ajax.get(backend.feed)
            .then(({status, responseObject}) => {
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot get json on url /feed`);
                }
                this.#userListJson = responseObject;
                this.#parseJson();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    #parseJson() {
        // TODO: отладить с Андреем
    }
}