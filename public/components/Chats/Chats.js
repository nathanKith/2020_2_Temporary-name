export default class Chats {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const logo = this.#createDiv('chats-logo');
        logo.innerHTML = `<span>Сообщения</span>`;

        const listChats = this.#createDiv('list-chats');
        const innerListChats = this.#createDiv('inner-list-chats');

        for (let i = 0; i < 10; ++i) {
            innerListChats.appendChild(this.#createChat());
        }

        listChats.appendChild(innerListChats);

        this.#parent.appendChild(logo);
        this.#parent.appendChild(listChats);
    }

    #createChat = () => {
        const chat = document.createElement('a');
        chat.href = '#';
        chat.classList.add('chat');

        const avatar = this.#createDiv('chat-avatar');
        avatar.innerHTML = `<img class="chat-avatar-photo" src="./img/pretty-girl.svg">`;
        const numberMessage = this.#createDiv('message-number');
        numberMessage.id = 'message-number';
        numberMessage.innerHTML = `<div class="inner-message-number">3</div>`;
        avatar.appendChild(numberMessage);

        const information = this.#createDiv('chat-info');
        const nameTime = this.#createDiv('name-time');
        nameTime.innerHTML = `<span id="name-chat">Кайя</span><span id="time-chat">04:20</span>`;
        information.appendChild(nameTime);
        const lastMessage = this.#createDiv('last-message');
        lastMessage.innerHTML = `<span id="last-message">Я же говорил тебе там какая-то шняга чел. Я же говорил тебе там какая-то шняга чел. Я же говорил тебе там какая-то шняга чел.</span>`;
        information.appendChild(lastMessage);

        chat.appendChild(avatar);
        chat.appendChild(information);

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