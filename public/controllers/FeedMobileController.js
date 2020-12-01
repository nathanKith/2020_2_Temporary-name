import {backend} from "../modules/url";
import {ChatModel} from "../models/ChatModel";
import ChatOtherMessage from "../components/ChatContent/ChatOtherMessage.hbs";
import {ajax} from "../modules/ajax";
import {ChatsMobileController} from "./ChatsMobileController";
import { yoomoney, yoomoneyUrl } from "../modules/yoomoney";


export class FeedMobileController{
    #view
    #feed
    #profile
    #chatsController

    #currentUserFeed
    #backUserClick

    constructor(feedView, feedListModel, chatsController, userModel) {
        this.#view = feedView;
        this.#feed = feedListModel;
        this.#chatsController = chatsController;
        this.#currentUserFeed = 0;
        this.#backUserClick = 0;

        this.#profile = userModel;
    }


    async update() {
        await this.#chatsController.updateWebsocket();
        await this.#feed.update();
        await this.#profile.update();
    }

    #makeContext() {
        return {
            feed: {
                feed: this.#feed.userList[this.#currentUserFeed],
                id: this.#profile.id,
                event: {
                    like: {
                        type: 'click',
                        listener: this.likeListener.bind(this),
                    },
                    dislike: {
                        type: 'click',
                        listener: this.dislikeListener.bind(this),
                    },
                    superLike: {
                        type: 'submit',
                        listener: this.superLikeListener.bind(this),
                    },
                    backUser: {
                        type: 'submit',
                        listener: this.backUserListener.bind(this),
                    },
                },
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

                this.#getNextUser();
                this.#backUserClick = 0;
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    #getNextUser() {
        if (this.#currentUserFeed === this.#feed.userList.length - 1) {
            this.#currentUserFeed = 0;
            this.#feed.update();
        } else {
            this.#currentUserFeed++;
        }

        this.#view.context = this.#makeContext();
        this.#view.rerenderFeed();
    }

    async superLikeListener(evt) {
        if (this.#profile.isPremium) {
            evt.preventDefault();
            await ajax.post(backend.superLike, {
                'user_id2': this.#feed.userList[this.#currentUserFeed].id,
            })
                .then(({ status, responseObject }) => {
                    if (status === 401) {
                        throw new Error(`${status} unauthorized: cannot get json on url /like`);
                    }

                    this.#getNextUser();
                    this.#backUserClick = 0;
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }

    #getPreviousUser() {
        if (this.#currentUserFeed === 0) {
            return;
        }
        this.#currentUserFeed--;

        this.#view.context = this.#makeContext();
        this.#view.rerenderFeed();
    }

    backUserListener(evt) {
        if (this.#profile.isPremium) {
            evt.preventDefault();

            if (this.#backUserClick === 0) {
                this.#getPreviousUser();
                this.#backUserClick = 1;
            }
        }
    }

    async control() {
        await this.update()
            .then(() => {
                this.#view.context = this.#makeContext();
                this.#view.render();
                // yoomoney.label = `${this.#profile.id}`;
                // console.log(yoomoney.json());
            });
    }
}