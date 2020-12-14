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
        await this.#getUsers();
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
                
                if (responseObject['user_feed']) {
                    this.#userListJson = responseObject['user_feed'];
                } else {
                }

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