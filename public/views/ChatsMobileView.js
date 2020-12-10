import {BaseView} from './BaseView';
import {Chats} from '../components/Chats/Chats';
import {FeedHeaderMobile} from '../components/FeedHeaderMobile/FeedHeaderMobile';

export class ChatsMobileView extends BaseView {
    constructor(app) {
        super(app);
    }

    render() {
        this._app.innerHTML = '';

        const background = document.createElement('div');
        background.classList.add('feed-background');
        this._app.appendChild(background);

        const container = document.createElement('div');
        container.classList.add('feed-container');
        background.appendChild(container);

        const navigationHeader = new FeedHeaderMobile(container);
        navigationHeader.render();

        const profileChatSection = document.createElement('div');
        profileChatSection.classList.add('profile-chat-section');
        container.appendChild(profileChatSection);

        const chats = new Chats(profileChatSection);
        chats.data = this._context['chats'];
        chats.render();
    }
}