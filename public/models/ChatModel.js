import {UserModel} from './UserModel';
import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';

export class ChatModel {
    #user_id
    #partner
    #id
    #messages
    #filter

    constructor(data = {}) {
        this.#fillChatData(data);
    }

    get id() {
        return this.#id;
    }

    set user_id(user) {
        this.#user_id = user;
    }

    get user_id() {
        return this.#user_id;
    }

    get partner() {
        return this.#partner;
    }

    get messages() {
        return this.#messages;
    }

    get filter() {
        return this.#filter;
    }

    set filter(filter) {
        this.#filter = filter;
    }

    async update() {
        await ajax.get(backend.chatId + this.#id)
            .then( ({status,responseObject}) => {
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot get json on url /chats/chat_id`);
                }
                this.#fillChatData(responseObject);
            }).catch((err) => {
                console.log(err.message);
            });
    }

    #fillChatData(data) {
        this.#user_id = null;
        this.#id = data['id'];
        this.#partner = new UserModel(data['partner']);
        this.#messages = data['messages'];
        this.#filter = data['filter'];
    }

    validationMessage(message) {
        return message.replaceAll(' ', '') === '' ? null : message;
    }
}
