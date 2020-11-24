import {BaseView} from './BaseView';
import {FeedHeaderMobile} from "../components/FeedHeaderMobile/FeedHeaderMobile";
import {Profile} from "../components/Profile/Profile";

export class ProfileMobileView extends BaseView {
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render() {
        this._app.innerHTML = '';

        const background = document.createElement('div');
        background.classList.add('feed-background');
        this._app.appendChild(background);

        const container = document.createElement('div');
        container.classList.add('feed-container');
        background.appendChild(container);

        const navigationHeader = new FeedHeaderMobile(container);
        navigationHeader.render();

        const mainSection = document.createElement('div');
        mainSection.classList.add('profile-chat-section');

        const profile = new Profile(mainSection);
        profile.data = this.context['profile'];
        profile.render();
    }
}