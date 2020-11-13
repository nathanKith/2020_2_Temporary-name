import ChatContentHbs from './ChatContent.hbs'
import ChatMyMessage from './ChatMyMessage.hbs'
import {ChatModel} from "../../models/ChatModel";
import ChatOtherMessage from './ChatOtherMessage.hbs'
import './ChatContent.css';
import {backend} from "../../modules/url";
import {Chats} from "../Chats/Chats";

//parent = profile-chat-section
export class ChatContent {
    #parent
    chatModel
    constructor(parent, chatModel) {
        this.#parent = parent;
        this.chatModel = chatModel;
    }
    async render() {
        // this.#parent.innerHTML = '';

        await this.#parent.insertAdjacentHTML('beforeend', ChatContentHbs(
            {
                path_photo: this.chatModel.partner.linkImages[0],
                nameUser: this.chatModel.partner.name,
            }));

        const messages = document.getElementById('chat-box-text-area');
            
        if (this.chatModel.messages) {
        this.chatModel.messages.forEach( (message) => {
                if (message.user_id === this.chatModel.partner.id) {
                    messages.insertAdjacentHTML('beforeend', ChatOtherMessage({
                        message_text: message.message,
                        time_delivery: message.timeDelivery,
                    }));
                } else {
                    messages.insertAdjacentHTML('beforeend', ChatMyMessage({
                        message_text: message.message,
                        time_delivery: message.timeDelivery,
                    }));
                }
        });
        }

        this.chatModel.websocket.onmessage = ( ({data}) => {
            const dataJSON = JSON.parse(data);
            const message = document.getElementById('chat-box-text-area');
            if (message) {
                message.insertAdjacentHTML('beforeend', ChatOtherMessage({
                    message_text: dataJSON.message,
                    time_delivery: dataJSON.timeDelivery,
                }));
            }
        });

        const button = document.getElementById('send');
        button.addEventListener('click', (evt) => {
            console.log(this.chatModel.validationMessage(document.getElementById('message').value));
            if (!this.chatModel.validationMessage(document.getElementById('message').value)) {
                return;
            }
            const delivery = (new Date().getHours() + ':' + new Date().getMinutes()).toString();
            messages.insertAdjacentHTML('beforeend', ChatMyMessage({
                message_text: document.getElementById('message').value,
                time_delivery: delivery,
            }));
            this.chatModel.listenerSend( document.getElementById('message').value, delivery);
        })
    }


}
