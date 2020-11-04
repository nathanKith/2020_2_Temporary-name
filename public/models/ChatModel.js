import {UserModel} from "./UserModel";
import {ajax} from "../modules/ajax";
import {backend} from "../modules/url";
import {ChatMyMessage} from "../components/ChatContent/ChatMyMessage.hbs";

export class ChatModel {
    #partner
    #id
    #messages
    #websocket

    constructor(data = {}) {
        this.#fillChatData(data);
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
        this.#id = data['id'];
        this.#partner = new UserModel(data['partner']);
        this.#messages = data['messages'];
    }

    listenerSend(message, delivery) {
        const mes = {
            message_text: message,
            time_delivery: delivery,
        }
        this.#websocket.send(JSON.stringify(mes));
    }

    validationMessage(message) {
        return message.replace(/ /g, '') ? null : message;
    }
}
// const chat = {
//     id: 2,
//     partner: 'UserModel',
//     messages: [
//         {
//             user_id: misha,
//         message: 'text',
//         timeDelivery: '7:23',
//         },
//         {
//             user_id: misha,
//             message: 'text',
//             timeDelivery: '7:23',
//         },
//     ]
// }