import {BaseView} from './BaseView';
import {Feed} from '../components/Feed/Feed';
import {ProfileChatIcon} from "../components/ProfileChatIcon/ProfileChatIcon";
import {Chats} from "../components/Chats/Chats";
import {Profile} from "../components/Profile/Profile";

export class FeedView extends BaseView{
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render() {
        this._app.innerHTML = '';
        this._app.classList.remove('registration-body-background')
        document.body.classList.remove('landing-body-background')

        const background = document.createElement('div');
        background.classList.add('feed-background');
        this._app.appendChild(background);

        const container = document.createElement('div');
        container.classList.add('feed-container');

        background.appendChild(container);

        const settings = document.createElement('div');
        settings.classList.add('settings');
        settings.innerHTML += `<a href="#"><img class="inner-settings" src="../img/configuration.svg"/></a>`;
        container.appendChild(settings);

        const feedSection = document.createElement('div');
        feedSection.classList.add('feed-section');
        container.appendChild(feedSection);

        const feed = new Feed(feedSection);
        feed.data = this._context['feed'];
        feed.render();

        const profileChatIcon = new ProfileChatIcon(container);
        const {profileButton, chatsButton} = profileChatIcon.render();

        const profileChatSection = document.createElement('div');
        profileChatSection.classList.add('profile-chat-section');
        container.appendChild(profileChatSection);

        const chats = new Chats(profileChatSection);
        chats.render();

        profileButton.addEventListener('click', (evt) => {
            profileChatSection.innerHTML = '';
            const profile = new Profile(profileChatSection);
            profile.data = this._context['profile'];
            profile.render();
            feedSection.classList.add('dark');
        });

        // TODO: добавить подгрузку чатов, сейчас они статичные
        chatsButton.addEventListener('click', (evt) => {
            profileChatSection.innerHTML = '';
            feedSection.classList.remove('dark');

            chats.render();
        });
    }

    rerenderFeed() {
        const feedSection = document.getElementsByClassName('feed-section');
        feedSection[0].innerHTML = '';
        const feed = new Feed(feedSection);
        feed.data = this._context['feed'];
        feed.render();
    }
}
