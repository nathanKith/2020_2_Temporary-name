import {BaseView} from './BaseView';
import {FeedHeaderMobile} from '../components/FeedHeaderMobile/FeedHeaderMobile';
import {Album} from '../components/Album/Album';

export class AlbumMobileView extends BaseView{
    constructor(app) {
        super(app);
    }

    render = (isMy = false) => {
        this._app.innerHTML = '';

        const background = document.createElement('div');
        background.classList.add('feed-background');
        this._app.appendChild(background);

        const container = document.createElement('div');
        container.classList.add('feed-container');
        background.appendChild(container);

        const navigationHeader = new FeedHeaderMobile(container);
        navigationHeader.render();

        const profileChatSection = document.createElement('div');
        profileChatSection.classList.add('profile-chat-section');
        container.appendChild(profileChatSection);

        const album = new Album(profileChatSection, this._context['albums'].linkImages);
        album.isMy = isMy;
        if (isMy) {
            album.listenerSave = this._context['albums'].savePhoto;
            album.listenerCancel = this._context['albums'].cancelPhoto;
            album.listenerDelete = this._context['albums'].deletePhoto;
        }
        album.render();
    }
}