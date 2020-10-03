import LandingHeader from './components/LandingHeader/LandingHeader.js'
import LandingContent from './components/LandingContent/LandingContent.js';

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
