import {ChatModel} from '../models/ChatModel';
import ChatOtherMessage from '../components/ChatContent/ChatOtherMessage.hbs';
import {backend} from '../modules/url';
import {Chats} from '../components/Chats/Chats';
import {tryRedirect} from '../modules/tryRedirect';
import {router} from '../main';

export class ChatsMobileController {
    #view
    #chats
    #profile
    #websocket

    constructor(view, chatListModel, userModel) {
        this.#view = view;
        this.#chats = chatListModel;
        this.#profile = userModel;
    }

    #makeContext() {
        return {
            chats: {
                chats: this.#chats.chatList,
                user_id: this.#profile.id,
                onSendWebsocket: this.onSendWebsocket.bind(this),
            },
        };
    }

    onSendWebsocket(user_id, chat_id, message, delivery) {
        const mes = {
            user_id: user_id,
            chat_id: chat_id,
            message: message,
            timeDelivery: delivery,
        };
        this.#websocket.send(JSON.stringify(mes));
        const scroll = document.getElementById('chat-box-text-area');
        scroll.scrollTop = scroll.scrollHeight;
    }

    pushEvent = () => {
        const chatsIcon = document.getElementsByClassName('inner-navigation-header__chats-button')[0];
        chatsIcon.classList.add('change-chat-icon');
    }

    onMessageWebsocket({data}) {
        const dataJSON = JSON.parse(data);
        console.log(dataJSON);
        console.log('get message');
        const chatModel = new ChatModel(dataJSON);
        const innerListChats = document.getElementsByClassName('inner-list-chats')[0]; // означает что отрисованы чаты
        const message = document.getElementById('chat-box-text-area');//означает что отрисован какой то чат
        const comments = document.getElementById('comments');//означает, что отрисованы комменты
        const profile = document.getElementsByClassName('profile')[0];// означает, что отрисован профиль
        const feed = document.getElementsByClassName('photos-cell')[0];

        if(innerListChats) {
            const chatList = this.#chats.chatList;
            const newChat = chatList.find( (chat) => {
                return chat.id === chatModel.id;
            });
            console.log(newChat);
            if (!newChat){
                const profileChatSection = document.getElementsByClassName('profile-chat-section')[0];
                const chats = new Chats(profileChatSection);
                chats.data = this.#makeContext()['chats'];

                innerListChats.appendChild(chats.createChat(chatModel));
                console.log(chatModel);
                this.#chats.appendChat(chatModel);
                const nc = document.getElementById('chat' + chatModel.id);
                nc.classList.add('chats-new');
            } else {
                const oldChat = document.getElementById('chat' + newChat.id);
                oldChat.classList.add('chats-new');
            }
        }

        if (message) {
            const chat = document.getElementById(chatModel.id);
            if (chat) {
                message.insertAdjacentHTML('beforeend', ChatOtherMessage({
                    message_text: dataJSON.messages[0].message,
                    time_delivery: dataJSON.messages[0].timeDelivery,
                }));
                const scroll = document.getElementById('chat-box-text-area');
                scroll.scrollTop = scroll.scrollHeight;
            } else {
                this.pushEvent();
            }
        }

        if(comments) {
            this.pushEvent();
        }

        if(profile) {
            this.pushEvent();
        }

        if (feed) {
            this.pushEvent();
        }
    }

    async updateWebsocket() {
        this.#websocket = await new WebSocket(backend.websocket);
        this.#websocket.onmessage = this.onMessageWebsocket.bind(this);
    }

    async update() {
        await this.#chats.update();
        await this.#profile.update();
    }

    async control() {
        const isAuth = await tryRedirect();
        if (!isAuth) {
            router.redirect('/');
            return;
        }

        await this.update();
        this.#view.context = this.#makeContext();
        this.#view.render();
    }
}
