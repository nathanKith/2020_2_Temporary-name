import {UserModel} from './UserModel';
import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';

export class UserListModel {
    #userList
    #userListJson

    constructor() {
        this.#userListJson = null;
        this.#userList = [];
    }

    async update() {
        this.#getUsers();
    }

    get userList() {
        return this.#userList;
    }

    async #getUsers() {
        await ajax.get(backend.feed)
            .then(({status, responseObject}) => {
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot get json on url /feed`);
                }
                this.#userListJson = responseObject['data'];
                this.#parseJson();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    #parseJson() {
        this.#userListJson.forEach((userJson) => {
            const user = new UserModel(userJson);
            this.#userList.push(user);
        });
    }
}