import {BaseView} from "./BaseView";
import {FeedView} from "./FeedView";
import {Comments} from "../components/Comments/Comments";

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

        const profileChatSection = document.createElement('div');
        profileChatSection.classList.add('profile-chat-section');
        container.appendChild(profileChatSection);

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
        //             this._context['comments'].event.getProfileByComment.listener);
        //     }, this);
        // }

    }
}