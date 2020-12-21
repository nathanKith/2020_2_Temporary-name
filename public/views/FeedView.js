import {BaseView} from './BaseView';
import {Feed} from '../components/Feed/Feed';
import {ProfileChatIcon} from '../components/ProfileChatIcon/ProfileChatIcon';
import {Chats} from '../components/Chats/Chats';
import {Profile} from '../components/Profile/Profile';
import {Settings} from '../components/Settings/Settings';
import {Comments} from '../components/Comments/Comments';
import {popupLanding} from '../modules/popupLanding';
import {Album} from '../components/Album/Album';
import {Swipes} from '../components/Swipes/swipes';


export class FeedView extends BaseView{
    #renderBackSettingsListener
    #renderSettingsListener
    #renderFeedBackListener

    constructor(app = document.getElementById('application')) {
        super(app);

        this.#renderBackSettingsListener = this.#renderBackSettings.bind(this);
        this.#renderSettingsListener = this.#renderSettings.bind(this);
        this.#renderFeedBackListener = this.#renderFeedBack.bind(this);
    }

    render() {
        this._app.innerHTML = '';
        this._app.removeEventListener('click', popupLanding);
        this._app.classList.remove('registration-body-background');
        document.body.classList.remove('landing-body-background');

        const background = document.createElement('div');
        background.classList.add('feed-background');
        this._app.appendChild(background);

        const container = document.createElement('div');
        container.classList.add('feed-container');

        background.appendChild(container);

        const settings = document.createElement('div');
        settings.classList.add('settings');
        settings.insertAdjacentHTML('afterbegin', '<span class="tooltip-settings">Настройки</span><div class="inner-settings" id="settings"><img src="../img/configuration.svg"/></div>');
        container.appendChild(settings);

        settings
            .getElementsByClassName('inner-settings')[0]
            .addEventListener('click', this.#renderSettingsListener);

        const feedSection = document.createElement('div');
        feedSection.classList.add('feed-section');
        container.appendChild(feedSection);

        const feed = new Feed(feedSection);
        feed.data = this._context['feed'];
        feed.render();


        //попытка свайпов на компе
        const profilePerson = document.getElementsByClassName('profile-person')[0];
        const swipes = new Swipes(profilePerson);
        swipes.data = this._context['feed'];
        swipes.control();
        //конец попытки

        const profileChatIcon = new ProfileChatIcon(container);
        const {profileButton, chatsButton, feedButton} = profileChatIcon.render();

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

            profileChatSection.addEventListener('click', (evt) => {
                evt.stopPropagation();
                evt.stopImmediatePropagation();
            });

            profileButton.addEventListener('click', (evt) => {
                evt.stopPropagation();
                evt.stopImmediatePropagation();
            });

            this._app.addEventListener('click', this.#renderFeedBackListener);

            const comments = document.getElementById('profile-comments');
            comments.addEventListener(this._context['comments'].event.getMyComments.type,
                this._context['comments'].event.getMyComments.listener);

            feedSection.classList.add('dark');
        }, true);


        chatsButton.addEventListener('click', (evt) => {
            chatsButton.classList.remove('change-chat-icon');
            profileChatSection.innerHTML = '';
            feedSection.classList.remove('dark');

            chats.data = this._context['chats'];
            chats.render();
        });

        // feedButton.addEventListener('click', (evt) => {
        //     profileChatSection.innerHTML = '';
        //     feedSection.innerHTML = '';
        //     feedSection.classList.remove('dark');

        //     const feed = new Feed(feedSection);
        //     feed.data = this._context['feed'];
        //     feed.render();

        //     chats.data = this._context['chats'];
        //     chats.render();

        //     const informationLogo = document.getElementById('information-logo');
        //     informationLogo.addEventListener(this._context['comments'].event.getComments.type,
        //         this._context['comments'].event.getComments.listener);
        // });

        feedButton.addEventListener('click', (evt) => {
            evt.preventDefault();

            this._app.removeEventListener('click', this.#renderFeedBackListener);
    
            const profileChatSection = document.getElementsByClassName('profile-chat-section')[0];
            profileChatSection.innerHTML = '';
    
            const feedSection = document.getElementsByClassName('feed-section')[0];
            feedSection.innerHTML = '';
            feedSection.classList.remove('dark');
    
            const feed = new Feed(feedSection);
            feed.data = this._context['feed'];
            feed.render();
    
            const chats = new Chats(profileChatSection);
            chats.listenerBack = this.#renderBackChats.bind(this);
            chats.data = this._context['chats'];
            chats.render();
    
            const informationLogo = document.getElementById('information-logo');
            if (informationLogo) {
                informationLogo.addEventListener(this._context['comments'].event.getComments.type,
                    this._context['comments'].event.getComments.listener);
            }
        });

        const informationLogo = document.getElementById('information-logo');
        if (informationLogo) {
            informationLogo.addEventListener(this._context['comments'].event.getComments.type,
                this._context['comments'].event.getComments.listener);
        }
    }

    #renderFeedBack(evt) {
        evt.preventDefault();

        this._app.removeEventListener('click', this.#renderFeedBackListener);

        const feedSection = document.getElementsByClassName('feed-section')[0];
        feedSection.classList.remove('dark');

        const profileChatSection = document.getElementsByClassName('profile-chat-section')[0];
        profileChatSection.innerHTML = '';

        const chats = new Chats(profileChatSection);
        chats.listenerBack = this.#renderBackChats.bind(this);
        chats.data = this._context['chats'];
        chats.render();

        const informationLogo = document.getElementById('information-logo');
        if (informationLogo) {
            informationLogo.addEventListener(this._context['comments'].event.getComments.type,
                                             this._context['comments'].event.getComments.listener);
        }
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

        // const images = document.getElementsByClassName('inner__profile-comments__avatar__photo');
        // if (images) {
        //     const avatars = Array.from(images);
        //     avatars.forEach((img) => {
        //         img.addEventListener(this._context['comments'].event.getProfileByComment.type,
        //                              this._context['comments'].event.getProfileByComment.listener);
        //     }, this);
        // }
       

        // const backToChats = document.getElementById('backToChat');
        // backToChats.addEventListener('click', this.#renderBackChats.bind(this));
    }

    renderOtherComments() {
        const profileChatSection = document.getElementsByClassName('profile-chat-section')[0];
        const comments = new Comments(profileChatSection);
        comments.data = this._context['comments'].comments.commentsList;
        comments.render();
        const sendButton = document.getElementById('send-comment');
        sendButton.addEventListener(this._context['comments'].event.sendOtherComment.type,
            this._context['comments'].event.sendOtherComment.listener);
    }


    renderAlbum = () => {
        const feedSection = document.getElementsByClassName('feed-section')[0];
        const album = new Album(feedSection, this._context['feed']['feed'].linkImages);
        album.isMy = false;
        album.render();

        //this._app.removeEventListener('click', this.#renderFeedBackListener);
    }

    renderOtherAlbum(user) {
        const feedSection = document.getElementsByClassName('feed-section')[0];
        const album = new Album(feedSection, user.linkImages);
        album.isMy = false;
        album.render();
    }

    renderMyAlbum = () => {
        const feedSection = document.getElementsByClassName('feed-section')[0];
        console.log('ya from render of album');
        console.log(this._context['profile'].linkImages);
        const album = new Album(feedSection, this._context['profile'].linkImages);
        album.isMy = true;
        album.listenerSave = this._context['albums'].savePhoto;
        album.listenerCancel = this._context['albums'].cancelPhoto;
        album.listenerDelete = this._context['albums'].deletePhoto;
        album.listenerMasks = this._context['albums'].overlayMask;
        album.render();

        this._app.removeEventListener('click', this.#renderFeedBackListener);
    }

    #renderSettings(evt) {
        evt.preventDefault();
        document
            .getElementsByClassName('inner-settings')[0]
            .removeEventListener('click', this.#renderSettingsListener);

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
            .addEventListener('click', this.#renderBackSettingsListener);


        document
            .getElementsByClassName('settings')[0]
            .addEventListener('click', (evt) => {
                evt.stopPropagation();
                
                evt.stopImmediatePropagation();
            });
        
        this._app.addEventListener('click', this.#renderBackSettingsListener);
    }

    rerenderSettings() {
        const err = document.getElementById('error');
        err.innerText = this._context['settings'].validate.passwords.message;
    }

    getSettingsData() {
        return {
            name: document.getElementById('settings-name').value,
            education: document.getElementById('education').value,
            job: document.getElementById('job').value,
            aboutMe: document.getElementById('aboutMe').value,
            filter: document.getElementById('filter').value,
        };
    }

    #renderBackSettings(evt) {
        evt.preventDefault();
        console.log(evt.target.classList);
        // if ('settings-open' in evt.target.classList || 'settings' in evt.target.classList) {
        //     return;
        // }

        this._app.removeEventListener('click', this.#renderBackSettingsListener);
        
        document
            .getElementsByClassName('inner-settings')[0]
            .removeEventListener('click', this.#renderBackSettingsListener);

        document
            .getElementsByClassName('feed-container')[0]
            .classList.remove('dark');

        const saveButton = document.getElementById('save-button');
        if ('pink-save' in saveButton.classList) {
            saveButton.classList.remove('pink-save');
        }

        const settingsDiv = document.getElementsByClassName('settings')[0];
        settingsDiv.innerHTML = '';
        settingsDiv.insertAdjacentHTML('afterbegin', '<span class="tooltip-settings">Настройки</span><div class="inner-settings" id="settings"><img src="../img/configuration.svg"/></div>');

        document
            .getElementsByClassName('inner-settings')[0]
            .addEventListener('click', this.#renderSettingsListener);
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

        const profilePerson = document.getElementsByClassName('profile-person')[0];
        const swipes = new Swipes(profilePerson);
        swipes.data = this._context['feed'];
        swipes.control();

        const informationLogo = document.getElementById('information-logo');
        if (informationLogo) {
            informationLogo.addEventListener(this._context['comments'].event.getComments.type,
                this._context['comments'].event.getComments.listener);
        }
    }

    renderOtherProfile() {
        const profileChatSection = document.getElementsByClassName('profile-chat-section')[0];
        profileChatSection.innerHTML = '';
        const profile = new Profile(profileChatSection);
        profile.data = this._context['otherProfile'];
        profile.render();
    }
}
