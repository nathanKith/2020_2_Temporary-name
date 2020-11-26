import {backend} from "../modules/url";
import {ChatModel} from "../models/ChatModel";
import ChatOtherMessage from "../components/ChatContent/ChatOtherMessage.hbs";
import {ajax} from "../modules/ajax";
import {ChatsMobileController} from "./ChatsMobileController";


export class FeedMobileController{
    #view
    #feed
    #chatsController

    #currentUserFeed

    constructor(feedView, feedListModel, chatsController) {
        this.#view = feedView;
        this.#feed = feedListModel;
        this.#chatsController = chatsController;
        this.#currentUserFeed = 0;
    }


    async update() {
        await this.#chatsController.updateWebsocket();
        await this.#feed.update();
    }

    #makeContext() {
        return {
            feed: {
                feed: this.#feed.userList[this.#currentUserFeed],
                event: {
                    like: {
                        type: 'click',
                        listener: this.likeListener.bind(this),
                    },
                    dislike: {
                        type: 'click',
                        listener: this.dislikeListener.bind(this),
                    }
                }
            },
        };
    }

    async likeListener(evt) {
        evt.preventDefault();
        await this.#likeDislikeAjax(backend.like);
    }

    async dislikeListener(evt) {
        evt.preventDefault();
        await this.#likeDislikeAjax(backend.dislike);
    }

    async #likeDislikeAjax(url) {
        await ajax.post(url, {
            'user_id2': this.#feed.userList[this.#currentUserFeed].id
        })
            .then(({status, responseObject}) => {
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot get json on url /like`);
                }

                if (this.#currentUserFeed === this.#feed.userList.length - 1) {
                    this.#currentUserFeed = 0;
                    this.#feed.update();
                } else {
                    this.#currentUserFeed++;
                }

                this.#view.context = this.#makeContext();
                this.#view.rerenderFeed();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    async control() {
        await this.update()
            .then(() => {
                this.#view.context = this.#makeContext();
                this.#view.render();
            });
    }
}