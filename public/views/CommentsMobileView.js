import {BaseView} from './BaseView';
import {FeedView} from './FeedView';
import {Comments} from '../components/Comments/Comments';
import {FeedHeaderMobile} from '../components/FeedHeaderMobile/FeedHeaderMobile';
import {router} from '../main';
import '../components/Comments/Comments.css';

export class CommentsMobileView extends BaseView {
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

        const comments = new Comments(profileChatSection);
        comments.data = this._context['comments'].comments.commentsList;
        comments.render();

        const profileButtonSection = document.getElementsByClassName('profile__top__right')[0];
        const albumButton = document.createElement('button');
        albumButton.type = 'button';
        albumButton.classList.add('profile__top__right__button');
        profileButtonSection.appendChild(albumButton);
        const photo = document.createElement('img');
        photo.classList.add('album-icon');
        photo.src = '../img/camera.svg';
        albumButton.appendChild(photo);

        albumButton.addEventListener('click', this.#getAlbumsListener.bind(this));


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
        //             this._context['comments'].event.getProfileByComment.listener);
        //     }, this);
        // }

    }

    #getAlbumsListener(evt) {
        evt.preventDefault();
        router.redirect(`/malbums/${this._context['comments'].user}`);
    }
}