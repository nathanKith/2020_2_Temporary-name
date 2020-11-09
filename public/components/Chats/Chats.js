import {LandingHeader} from "../LandingHeader/LandingHeader";
import {ChatContent} from "../ChatContent/ChatContent";
import './Chats.css';

export class Chats {
    #parent
    #data
    listenerBack

    constructor(parent) {
        this.#parent = parent;
    }

    set data(data) {
        this.#data = data;
        console.log('сеттер data chats');
        console.log(this.#data);
    }

    render() {
        const logo = this.#createDiv('chats-logo');
        logo.insertAdjacentHTML('afterbegin', `<span>Сообщения</span>`);

        const listChats = this.#createDiv('list-chats');
        const innerListChats = this.#createDiv('inner-list-chats');

        if(this.#data.chats){
            this.#data.chats.forEach( (chat) => {
                innerListChats.appendChild(this.#createChat(chat));
            } );
        }
        // for (let i = 0; i < 10; ++i) {
        //     innerListChats.appendChild(this.#createChat());
        // }

        listChats.appendChild(innerListChats);

        this.#parent.appendChild(logo);
        this.#parent.appendChild(listChats);
    }

    #createChat = (Chat) => {
        // if (Chat.websocket) {
        //     Chat.WebSocketClose();
        // }
        console.log('метод createChat');
        console.log(Chat);
        const chat = document.createElement('a');
        chat.href = '#';
        chat.classList.add('chat');

        const avatar = this.#createDiv('chat-avatar');
        avatar.insertAdjacentHTML('afterbegin', `<img class="chat-avatar-photo" src="${Chat.partner.linkImages[0]}">`);
        // const numberMessage = this.#createDiv('message-number');
        // numberMessage.id = 'message-number';
        // numberMessage.innerHTML = `<div class="inner-message-number">3</div>`;
        // avatar.appendChild(numberMessage);

        const information = this.#createDiv('chat-info');
        const nameTime = this.#createDiv('name-time');
        
        
        nameTime.insertAdjacentHTML('afterbegin', `<span id="name-chat">${Chat.partner.name}</span>`);

        if (Chat.messages) {
            nameTime.insertAdjacentHTML('beforeend', `<span id="time-chat">${Chat.messages[Chat.messages.length - 1].timeDelivery}</span>`)
            information.appendChild(nameTime);
            const lastMessage = this.#createDiv('last-message');
            lastMessage.insertAdjacentHTML('afterbegin', `<span id="last-message">${Chat.messages[Chat.messages.length - 1].message}</span>`);
            information.appendChild(lastMessage);
        } else {
            nameTime.insertAdjacentHTML('beforeend', `<span id="time-chat"></span>`)
            information.appendChild(nameTime);
            const lastMessage = this.#createDiv('last-message');
            lastMessage.insertAdjacentHTML('afterbegin', `<span id="last-message"></span>`);
            information.appendChild(lastMessage);
        }
    
        
        chat.appendChild(avatar);
        chat.appendChild(information);

        chat.addEventListener('click', async (evt) => {
            evt.preventDefault();
            this.#parent.innerHTML = '';
            await Chat.update();
            await Chat.WebSocket();
            const chatContent = new ChatContent(this.#parent, Chat);
            chatContent.chatModel.user_id = this.#data['user_id'];
            chatContent.render()
            .then( () => {
                document
                .getElementById('back')
                .addEventListener('click', this.listenerBack.bind(this.listenerBack));
            })
        });

        return chat;
    }

    #createDiv = (className) => {
        const div = document.createElement('div');
        div.classList.add(className);

        return div;
    }

    #createSpan = (id, text, className = null) => {
        const span = document.createElement('span');
        span.id = id;
        span.innerHTML = text;
        if (className) {
            span.classList.add(className);
        }

        return span;
    }
}
