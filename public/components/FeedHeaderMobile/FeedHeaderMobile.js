import FeedHeaderMobileTemplate from './FeedHeaderMobile.hbs';
import './FeedHeaderMobile.css';
import {router} from '../../main';

export class FeedHeaderMobile {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.insertAdjacentHTML('afterbegin', FeedHeaderMobileTemplate());
        this.#addListeners();
    }

    #addListeners() {
        const settings = document.querySelector('.inner-navigation-header__settings');
        settings.addEventListener('click', (evt) => {
            evt.preventDefault();
            router.redirect('/msettings');
        })

        const feed = document.querySelector('.inner-navigation-header__feed-button');
        feed.addEventListener('click', (evt) => {
            evt.preventDefault();
            router.redirect('/mfeed');
        });

        const profile = document.querySelector('.inner-navigation-header__profile-button');
        profile.addEventListener('click', (evt) => {
            evt.preventDefault();
            router.redirect('/mprofile');
        });

        const chats = document.querySelector('.inner-navigation-header__chats-button');
        chats.addEventListener('click', (evt) => {
            evt.preventDefault();
            router.redirect('/mchats');
        });
    }
}