import CommentsHbs from './Comments.hbs';
import CommentsComment from './CommentsComment.hbs';
import CommentsSend from './CommentsSend.hbs';
import './Comments.css';

export class Comments {
    #parent
    #data

    constructor(parent) {
        this.#parent = parent;
    }

    set data(data){
        this.#data = data;
    }

    render = () => {
        this.#parent.innerHTML = '';
        this.#parent.insertAdjacentHTML('beforeend', CommentsHbs());
        const comments = document.getElementById('comments');
        if (!this.#data) {
            this.#data = [];
        }
        this.#data.forEach( (comment) => {
            comments.insertAdjacentHTML('beforeend', CommentsComment({
                commentText: comment.commentText,
                avatar: comment.user.linkImages[0],
                name: comment.user.name,
                timeDelivery: comment.timeDelivery,
                id: comment.user.id,
            }));
        });
        comments.insertAdjacentHTML('beforeend', CommentsSend());
    }
}
