import {ChatContentHbs} from './ChatContent.hbs'
import {ChatMyMessage} from './ChatMyMessage.hbs'
import {ChatModel} from "../../models/ChatModel";
import {ChatOtherMessage} from './ChatOtherMessage.hbs'
import './styles.css'
import {backend} from "../../modules/url";

//parent = profile-chat-section
export class ChatContent {
    #parent
    chatModel
    constructor(parent) {
        this.#parent = parent;
        this.chatModel.websocket = new WebSocket(backend.websocket);
    }
    render = () => {
        // this.chatModel.update();
        this.#parent.insertAdjacentElement('beforeend', new ChatContentHbs(
            {
                path_photo: this.chatModel.partner().linkImages[0],
                nameUser: this.chatModel.partner().name,
            }));

        const messages = document.getElementById('chat-box-text-area');

        this.chatModel.messages.forEach( (message) => {
                if (message.user_id === this.chatModel.partner().id) {
                    messages.insertAdjacentElement('beforeend',new ChatOtherMessage({
                        message_text: message.message,
                        time_delivery: message.timeDelivery,
                    }));
                } else {
                    messages.insertAdjacentElement('beforeend', new ChatMyMessage({
                        message_text: message.message,
                        time_delivery: message.timeDelivery,
                    }));
                }
        });

        // this.#parent.insertAdjacentElement('beforeend', new ChatContentHbs({path_photo: './img/pretty-girl.svg',
        //     nameUser: 'Кайя'}));
        //
        // messages.insertAdjacentElement('beforeend', new ChatMyMessage({
        //     message_text: 'Hei, pretty girl!',
        //     time_delivery: '7:26'
        // }));
        // messages.insertAdjacentElement('beforeend',new ChatOtherMessage({
        //     message_text: 'Hei, wanna bang?',
        //     time_delivery: '7:27',
        // }));
        this.chatModel.websocket.onmessage = ( ({data}) => {
            messages.insertAdjacentElement('beforeend',new ChatOtherMessage({
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
            messages.insertAdjacentElement('beforeend', new ChatMyMessage({
                message_text: document.getElementById('message').value,
                time_delivery: delivery,
            }));
            this.chatModel.listenerSend( document.getElementById('message').value, delivery);
        })

    }
}
