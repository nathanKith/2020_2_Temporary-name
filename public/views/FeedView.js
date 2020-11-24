import {BaseView} from './BaseView';
import {Feed} from '../components/Feed/Feed';
import {ProfileChatIcon} from "../components/ProfileChatIcon/ProfileChatIcon";
import {Chats} from '../components/Chats/Chats';
import {Profile} from '../components/Profile/Profile';
import {Settings} from '../components/Settings/Settings';
import {Comments} from '../components/Comments/Comments';
import {popupLanding} from '../modules/popupLanding';


export class FeedView extends BaseView{
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render() {
        this._app.innerHTML = '';
        this._app.removeEventListener('click', popupLanding);
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
            const comments = document.getElementById('profile-comments');
            comments.addEventListener(this._context['comments'].event.getMyComments.type,
                                        this._context['comments'].event.getMyComments.listener);

            feedSection.classList.add('dark');
        });

        // TODO: добавить подгрузку чатов, сейчас они статичные
        chatsButton.addEventListener('click', (evt) => {
            chatsButton.classList.remove('change-chat-icon');
            profileChatSection.innerHTML = '';
            feedSection.classList.remove('dark');

            chats.data = this._context['chats'];
            chats.render();
        });

        const informationLogo = document.getElementById('information-logo');
        informationLogo.addEventListener(this._context['comments'].event.getComments.type,
                                         this._context['comments'].event.getComments.listener);
    }

    renderComments(isMy=false) {
        const profileChatSection = document.getElementsByClassName('profile-chat-section')[0];
        const comments = new Comments(profileChatSection);
        comments.data = this._context['comments'].comments.commentsList;
        comments.render();

        const sendButton = document.getElementById('send-comment');
        if (isMy) {
            sendButton.addEventListener(this._context['comments'].event.sendMyComments.type,
                                        this._context['comments'].event.sendMyComments.listener);
        } else {
            sendButton.addEventListener(this._context['comments'].event.sendComment.type,
                                          this._context['comments'].event.sendComment.listener);
        }

        const images = document.getElementsByClassName('inner__profile-comments__avatar__photo');
        if (images) {
            const avatars = Array.from(images);
            avatars.forEach((img) => {
                img.addEventListener(this._context['comments'].event.getProfileByComment.type,
                                     this._context['comments'].event.getProfileByComment.listener);
            }, this);
        }
       

        const backToChats = document.getElementById('backToChat');
        backToChats.addEventListener('click', this.#renderBackChats.bind(this));
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

        const saveButton = document.getElementById('save-button');
        if ('pink-save' in saveButton.classList) {
            saveButton.classList.remove('pink-save');
        }

        const settingsDiv = document.getElementsByClassName('settings')[0];
        settingsDiv.innerHTML = '';
        settingsDiv.insertAdjacentHTML('afterbegin', `<div class="inner-settings" id="settings"><img src="../img/configuration.svg"/></div>`);

        document
            .getElementsByClassName('inner-settings')[0]
            .addEventListener('click', this.#renderSettings.bind(this));
    }

    #renderBackChats(evt) {
        evt.preventDefault();
        const backChats = document.getElementById('back');
        if (backChats) {
            backChats.removeEventListener('click', this.#renderBackChats.bind(this));
        }
        const profileChatSection = document
            .getElementsByClassName('profile-chat-section')[0];

        profileChatSection.innerHTML = '';
        const chats = new Chats(profileChatSection);
        chats.data = this._context['chats'];
        chats.render();
        const dark = document.getElementsByClassName('dark')[0];
        if (dark) {
            dark.classList.remove('dark');
        }
    }

    rerenderFeed() {
        const feedSection = document.getElementsByClassName('feed-section')[0];
        feedSection.innerHTML = '';
        const feed = new Feed(feedSection);
        feed.data = this._context['feed'];
        feed.render();

        const informationLogo = document.getElementById('information-logo');
        informationLogo.addEventListener(this._context['comments'].event.getComments.type,
                                         this._context['comments'].event.getComments.listener);
    }

    renderOtherProfile() {
        const profileChatSection = document.getElementsByClassName('profile-chat-section')[0];
        profileChatSection.innerHTML = '';
        const profile = new Profile(profileChatSection);
        profile.data = this._context['otherProfile'];
        profile.render();
    }
}
