import {BaseView} from './BaseView'
import {Chats} from '../components/Chats/Chats'

export class ChatsMobileView extends BaseView {
    constructor(app) {
        super(app);
    }

    render = () => {
        this._app.innerHTML = '';

        const container = document.createElement('div');
        container.classList.add('feed-container');
        this._app.appendChild(container);

        // TODO: добавить header

        const profileChatSection = document.createElement('div');
        profileChatSection.classList.add('profile-chat-section');
        container.appendChild(profileChatSection);

        const chats = new Chats(profileChatSection);
        chats.data = this._context['chats'];
        chats.render();
    }
}