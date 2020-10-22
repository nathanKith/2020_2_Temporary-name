// import './styles.css';
// import './components/LandingContent/LandingContent.css';
// import './components/Feed/Feed.css';
// import './components/ProfileChatIcon/ProfileChatIcon.css';
// import './components/Profile/Proile.css';
// import './components/Chats/Chats.css';
// import './components/Registration/Registration.css';
// import './components/Authorization/Authorization.css';

import {LandingView} from './views/LandingView';
import {Feed} from './components/Feed/Feed.js';
import {ProfileChatIcon} from './components/ProfileChatIcon/ProfileChatIcon.js'
import {Profile} from './components/Profile/Profile.js'
import {Chats} from './components/Chats/Chats.js';
import {Registration} from "./components/Registration/Registration.js";
import {Authorization} from "./components/Authorization/Authorization.js";
import ajax from './modules/ajax.js';

const backend = `http://95.163.213.222:8080/api/v1`;
//
// let div = document.createElement('div');
// div.id = 'application';
// document.body.appendChild(div);
// const application = document.getElementById('application');

const router = {
    landing: {
        href: '/',
        open: landingPage,
    },
    signup: {
        href: '/signup',
        open: signupPage,
    },
    login: {
        href: '/login',
        open: loginPage,
    },
    feed: {
        href: '/feed',
        open: feedPage,
    }
}

export function landingPage() {
    (new LandingView()).render();
}

export function feedPage() {
    application.innerHTML = '';
    application.classList.remove('registration-body-background')
    document.body.classList.remove('landing-body-background')

    const background = document.createElement('div');
    background.classList.add('feed-background');
    application.appendChild(background);

    const container = document.createElement('div');
    container.classList.add('feed-container');

    background.appendChild(container);

    const settings = document.createElement('div');
    settings.classList.add('settings');
    settings.innerHTML += `<a href="#"><img class="inner-settings" src="./img/configuration.svg"/></a>`;

    container.appendChild(settings);

    const feedSection = document.createElement('div');
    feedSection.classList.add('feed-section');
    container.appendChild(feedSection);

    ajax.ajaxGet(backend + '/feed', null)
        .then(({status, responseObject}) => {
            const feed = new Feed(feedSection);
            feed.data = responseObject;
            feed.render();
        })
        .catch((err) => {
            console.log({err})
            alert(err);
        });

    const profileChatIcon = new ProfileChatIcon(container);
    const {profileButton, chatsButton} = profileChatIcon.render();

    const profileChatSection = document.createElement('div');
    profileChatSection.classList.add('profile-chat-section');
    container.appendChild(profileChatSection);

    const chats = new Chats(profileChatSection);
    chats.render();

    profileButton.addEventListener('click', (evt) => {
        profileChatSection.innerHTML = '';

        ajax.ajaxGet(backend +'/me', null)
            .then(({status, responseObject}) => {
                const profile = new Profile(profileChatSection);
                profile.data = responseObject;
                profile.render();
                feedSection.classList.add('dark');
            })
            .catch((err) => {
                alert(err);
            });
    });

    chatsButton.addEventListener('click', (evt) => {
        profileChatSection.innerHTML = '';
        feedSection.classList.remove('dark');

        chats.render();
    });

}

function signupPage() {
    application.innerHTML = '';
    application.classList.add('registration-body-background');

    const header = new LandingHeader(application);
    header.render();

    const div = document.createElement('div');
    div.classList.add('formView');
    application.appendChild(div);

    const divFormView = document.createElement('div');
    divFormView.classList.add('inner-formView');
    div.appendChild(divFormView);

    const registration = new Registration(divFormView);
    registration.render();

    const footer = document.createElement('footer');
    footer.classList.add('landing-footer');
    application.appendChild(footer);
}

export function loginPage() {
    application.innerHTML = '';
    application.classList.add('registration-body-background');

    const header = new LandingHeader(application);
    header.render();

    const div = document.createElement('div');
    div.classList.add('formView');
    application.appendChild(div);

    const divFormView = document.createElement('div');
    divFormView.classList.add('inner-formView');
    div.appendChild(divFormView);

    const auth = new Authorization(divFormView);
    auth.render();

    const footer = document.createElement('footer');
    footer.classList.add('landing-footer');
    application.appendChild(footer);
}

application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        router[target.dataset.section].open();
    }
});

landingPage();
