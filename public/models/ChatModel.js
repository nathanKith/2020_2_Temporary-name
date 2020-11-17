import {UserModel} from "./UserModel";
import {ajax} from "../modules/ajax";
import {backend} from "../modules/url";

export class ChatModel {
    #user_id
    #partner
    #id
    #messages
    #websocket

    constructor(data = {}) {
        this.#fillChatData(data);
    }

    get id() {
        return this.#id;
    }

    set user_id(user) {
        this.#user_id = user;
    }

    get partner() {
        return this.#partner;
    }

    get messages() {
        return this.#messages;
    }

    get websocket() {
        return this.#websocket;
    }

    set websocket(websocket) {
        this.#websocket = websocket;
    }

    async WebSocket() {
        this.#websocket =  await new WebSocket(backend.websocket);
    }

    async WebSocketClose() {
        return await this.#websocket.close();
    }

    // async updateWebsocket() {
    //     await new WebSocket(backend.websocket);
    // }

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
    }

    listenerSend(message, delivery) {
        const mes = {
            user_id: this.#user_id,
            chat_id: this.#id,
            message: message,
            timeDelivery: delivery,
        }
        this.#websocket.send(JSON.stringify(mes));
    }

    validationMessage(message) {
        return message.replaceAll(' ', '') === '' ? null : message;
    }
}
