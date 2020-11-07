import {BaseView} from './BaseView';
import {Feed} from '../components/Feed/Feed';
import {ProfileChatIcon} from "../components/ProfileChatIcon/ProfileChatIcon";
import {Chats} from '../components/Chats/Chats';
import {Profile} from '../components/Profile/Profile';
import {Settings} from '../components/Settings/Settings';

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
        settings.insertAdjacentHTML('afterbegin', `<div class="inner-settings" id="settings"><img src="../img/configuration.svg"/></div>`);
        container.appendChild(settings);

        settings
            .getElementsByClassName('inner-settings')[0]
            .addEventListener('click', this.#renderSettings.bind(this));

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
        chats.listenerBack = this.#renderBackChats.bind(this);
        chats.data = this._context['chats'];
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

            chats.data = this._context['chats'];
            chats.render();
        });
    }

    #renderSettings(evt) {
        evt.preventDefault();
        document
            .getElementsByClassName('inner-settings')[0]
            .removeEventListener('click', this.#renderSettings);

        document
            .getElementsByClassName('feed-container')[0]
            .classList.add('dark');

        const settingsDiv = document.getElementsByClassName('settings')[0];
        settingsDiv.innerHTML = '';
        const settings = new Settings(settingsDiv);
        settings.data = this._context['settings'];
        settings.render();

        document
            .getElementsByClassName('inner-settings')[0]
            .addEventListener('click', this.#renderBackSettings.bind(this));
    }

    #popupRenderBackSettings(evt) {
        evt.preventDefault();
        if (evt.target.id === 'settings') {
            return;
        }
        this.#renderSettings(evt);
    }

    #renderBackSettings(evt) {
        evt.preventDefault();
        document
            .getElementsByClassName('inner-settings')[0]
            .removeEventListener('click', this.#renderBackSettings.bind(this));

        document
            .getElementsByClassName('feed-container')[0]
            .classList.remove('dark');

        const settingsDiv = document.getElementsByClassName('settings')[0];
        settingsDiv.innerHTML = '';
        settingsDiv.insertAdjacentHTML('afterbegin', `<div class="inner-settings" id="settings"><img src="../img/configuration.svg"/></div>`);

        document
            .getElementsByClassName('inner-settings')[0]
            .addEventListener('click', this.#renderSettings.bind(this));
        
        // document.addEventListener('click', this.#popupRenderBackSettings.bind(this));
    }

    #renderBackChats() {
        const profileChatSection = document
            .getElementsByClassName('profile-chat-section')[0];
        profileChatSection.innerHTML = '';
        const chats = new Chats(profileChatSection);
        chats.data = this._context['chats'];
        chats.render();
    }

    rerenderFeed() {
        const feedSection = document.getElementsByClassName('feed-section')[0];
        feedSection.innerHTML = '';
        const feed = new Feed(feedSection);
        feed.data = this._context['feed'];
        feed.render();
    }
}
