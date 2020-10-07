import LandingHeader from './components/LandingHeader/LandingHeader.js';
import LandingContent from './components/LandingContent/LandingContent.js';
import Feed from './components/Feed/Feed.js';
import ProfileChatIcon from './components/ProfileChatIcon/ProfileChatIcon.js'
import Profile from './components/Profile/Profile.js'
import ajax from './modules/ajax.js';


const application = document.getElementById('application')

const router = {
    landing: {
        href: '/',
        open: landingPage,
    },
    signup: {
        href: '/signup',
        open: other,
    },
    login: {
        href: '/login',
        open: other,
    },
    profile: {
        href: '/profile',
        // open: ,
    },
    feed: {
        href: '/feed',
        // open: ,
    }
}

function landingPage() {
    application.innerHTML = '';

    document.body.classList.add('landing-body-background');

    const div = document.createElement('div');
    div.classList.add('landing-heart-background');
    application.appendChild(div);

    const header = new LandingHeader(div);
    header.render();

    const main = new LandingContent(div);
    main.render();

    const footer = document.createElement('footer');
    footer.classList.add('landing-footer');
    div.appendChild(footer);
}

function feedPage() {
    application.innerHTML = '';

    const background = document.createElement('div');
    background.classList.add('feed-background');

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

    ajax.ajaxGet('/feed', null)
        .then(({status, responseObject}) => {
            const feed = new Feed(feedSection);
            feed.data = responseObject;
            feed.render();
        })
        .catch((err) => {
            alert(err);
        });

    const profileChatIcon = new ProfileChatIcon(container);
    const {profileButton, chatsButton} = profileChatIcon.render();

    const profileChatSection = document.createElement('div');
    profileChatSection.classList.add('profile-chat-section');
    container.appendChild(profileChatSection);

    profileButton.addEventListener('click', (evt) => {
        profileChatSection.innerHTML = '';

        ajax.ajaxGet('/me', null)
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
        // пока класса нету
    });

    application.appendChild(background);
}



function other() {
    application.innerHTML = '';
}

application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        router[target.dataset.section].open();
    }
});

landingPage();
