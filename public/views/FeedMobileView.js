import {BaseView} from './BaseView';
import {popupLanding} from '../modules/popupLanding';
import {Feed} from '../components/Feed/Feed';
import {FeedHeaderMobile} from '../components/FeedHeaderMobile/FeedHeaderMobile';
import {router} from '../main';

export class FeedMobileView extends BaseView {
    constructor(app) {
        super(app);
    }

    render = () => {
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

        const navigationHeader = new FeedHeaderMobile(container);
        navigationHeader.render();

        const feedSection = document.createElement('div');
        feedSection.classList.add('feed-section');
        container.appendChild(feedSection);

        const feed = new Feed(feedSection);
        feed.data = this._context['feed'];
        feed.render();

        const informationLogo = document.getElementById('information-logo');
        if (informationLogo) {
            informationLogo.addEventListener('click', this.#getCommentsListener.bind(this));
        }
    }

    #getCommentsListener(evt) {
        evt.preventDefault();
        router.redirect(`/mcomments/${this._context['feed'].feed.id}`);
    }

    rerenderFeed() {
        const informationLogo = document.getElementById('information-logo');
        informationLogo.removeEventListener('click', this.#getCommentsListener.bind(this));

        const feedSection = document.getElementsByClassName('feed-section')[0];
        feedSection.innerHTML = '';
        const feed = new Feed(feedSection);
        feed.data = this._context['feed'];
        feed.render();

        const newInformationLogo = document.getElementById('information-logo');
        newInformationLogo.addEventListener('click', this.#getCommentsListener.bind(this));
    }
}