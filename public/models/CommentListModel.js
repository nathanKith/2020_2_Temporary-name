import {CommentModel} from './CommentModel';
import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';
import {UserModel} from './UserModel';

export class CommentListModel {
    #commentsList
    #commentsListJson

    constructor() {
        this.#commentsListJson = null;
        this.#commentsList = [];
    }

    async update(user_id) {
        await this.getComments(user_id);
    }

    get commentsList() {
        return this.#commentsList;
    }

    async getComments(user_id) {
        await ajax.get(backend.commentsById + user_id)
            .then( ({status, responseObject}) => {
                if (status !== 200) {
                    throw new Error(`${status} error`);
                }
                this.#commentsListJson = responseObject['data'].comments;
                if (this.#commentsListJson) {
                    this.#parseJson();
                } else {
                    this.#commentsList = [];
                }
            } )
            .catch((err) => {
                console.log(err.message);
            });
    }

    #parseJson() {
        this.#commentsList = [];
        this.#commentsListJson.forEach((commentJson) => {
            const comment = new CommentModel(commentJson);
            this.#commentsList.push(comment);
        });
    }

}