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
        this.chatModel.websocket = new WebSocket(backend.websocket);
        this.chatModel.update();
    }
    render = () => {
        this.#parent.innerHTML = '';


        this.#parent.insertAdjacentHTML('beforeend', ChatContentHbs(
            {
                path_photo: this.chatModel.partner.linkImages[0],
                nameUser: this.chatModel.partner.name,
            }));

        const messages = document.getElementById('chat-box-text-area');

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

        this.chatModel.websocket.onmessage = ( ({data}) => {
            messages.insertAdjacentHTML('beforeend',ChatOtherMessage({
                message_text: data.message,
                time_delivery: data.timeDelivery,
            }));
        });

        const button = document.getElementById('send');
        button.addEventListener('click', (evt) => {
            if (!this.chatModel.validationMessage(document.getElementById('message').value)) {
                return;
            }
            const delivery = (new Date()).toString();
            messages.insertAdjacentHTML('beforeend', ChatMyMessage({
                message_text: document.getElementById('message').value,
                time_delivery: delivery,
            }));
            this.chatModel.listenerSend( document.getElementById('message').value, delivery);
        })


    }
}
