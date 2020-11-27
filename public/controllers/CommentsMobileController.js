import {CommentModel} from "../models/CommentModel";

export class CommentsMobileController {
    #view
    #profile
    #comments
    #userId

    constructor(view, userModel, commentsListModel) {
        this.#view = view;
        this.#profile = userModel;
        this.#comments = commentsListModel;
    }

    async update(userId) {
        await this.#profile.update();
        await this.#comments.update(userId);
    }

    #makeContext() {
        return {
            comments: {
                comments: this.#comments,
                event: {
                    sendComment: {
                        type: 'click',
                        listener: this.sendCommentListener.bind(this),
                    }
                },
            },
        };
    }

    async sendCommentListener(evt) {
        evt.preventDefault();
        const comment = new CommentModel({
            user: this.#profile,
            commentText: document.getElementById('text-comment').value,
            timeDelivery: '',
        });
        await comment.addComment(Number(this.#userId));
        this.#view.context.comments.comments.commentsList.push(comment);
        this.#view.render();
    }

    async control(userId) {
        this.#userId = userId;
        await this.update(userId);
        this.#view.context = this.#makeContext();
        this.#view.render();
    }
}