import {UserModel} from './UserModel';
import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';

export class CommentModel {
    #id
    #user
    #commentText
    #timeDelivery

    constructor(data) {
        this.#fillCommentData(data);
    }

    get id() {
        return this.#id;
    }

    get user() {
        return this.#user;
    }

    get commentText() {
        return this.#commentText;
    }

    get timeDelivery() {
        return this.#timeDelivery;
    }

    equal(commentModel) {

    }

    #fillCommentData(data) {
        this.#user = new UserModel(data['user']);
        this.#commentText = data['commentText'];
        this.#timeDelivery = data['timeDelivery'];
    }

    async addComment(user_id) {
        await ajax.post(backend.comment, {
            user_id1: this.#user.id,
            user_id2: user_id,
            commentText: this.#commentText,
            timeDelivery: this.#timeDelivery,
        })
            .then( ({status, responseObject}) => {
                if (status !== 200) {
                    throw new Error(`${status} error`);
                }
            })
            .catch( (error) => {
                console.log(error.message);
            });
    }
}