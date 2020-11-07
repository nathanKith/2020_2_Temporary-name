import {BaseView} from './BaseView';
import {Feed} from '../components/Feed/Feed';
import {ProfileChatIcon} from "../components/ProfileChatIcon/ProfileChatIcon";
import {Chats} from '../components/Chats/Chats';
import {Profile} from '../components/Profile/Profile';
import {Settings} from '../components/Settings/Settings';
import {Comments} from '../components/Comments/Comments';


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

        const informationLogo = document.getElementById('information-logo');
        informationLogo.addEventListener(this._context['comments'].event.getComments.type,
                                         this._context['comments'].event.getComments.listener);

        const sendComments = document.getElementById('send-comment');
        sendComments.addEventListener(this._context['comments'].event.sendComment.type,
                                      this._context['comments'].event.sendComment.listener);
    }

    renderComments() {
        const profileChatSection = document.getElementsByClassName('profile-chat-section')[0];
        const comments = new Comments(profileChatSection);
        comments.data = this._context['comments'].comments.commentsList;
        comments.render();
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

    // #popupRenderBackSettings(evt) {
    //     evt.preventDefault();
    //     if (evt.target.id === 'settings') {
    //         return;
    //     }
    //     this.#renderSettings(evt);
    // }

    rerenderSettings() {
        const err = document.getElementById('error');
        err.innerText = this._context['settings'].validate.passwords.message;
    }

    getSettingsData() {
        return {
            telephone: document.getElementById('account-tel').value,
            password: document.getElementById('password').value,
            repeatPassword: document.getElementById('repeat-password').value,
            name: document.getElementById('settings-name').value,
            education: document.getElementById('education').value,
            job: document.getElementById('job').value,
            aboutMe: document.getElementById('aboutMe').value,
        };
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
