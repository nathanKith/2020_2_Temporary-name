import {ChatModel} from "./ChatModel";
import {ajax} from "../modules/ajax";
import {backend} from "../modules/url";


export class ChatListModel {
    #chatList
    #chatListJson

    constructor() {
        this.#chatListJson = null;
        this.#chatList = [];
    }

    async update() {
        await this.#getChats();
    }

    get chatList() {
        return this.#chatList;
    }

    async #getChats() {
        await ajax.get(backend.chats)
            .then(({status, responseObject}) => {
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot get json on url /chats`);
                }
                this.#chatListJson = responseObject['data'];
                this.#parseJson();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    #parseJson() {
        this.#chatList = [];
        this.#chatListJson.forEach((chatJson) => {
            const chat = new ChatModel(chatJson);
            this.#chatList.push(chat);
        });
    }
}