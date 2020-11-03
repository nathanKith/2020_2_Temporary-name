import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';

export class FeedController {
    #view
    #profile
    #feed
    #chats

    #currentUserFeed

    constructor(feedView, userModel, feedListModel, chatModel) {
        this.#view = feedView;
        this.#profile = userModel;
        this.#feed = feedListModel;
        this.#chats = chatModel;

        this.#currentUserFeed = 0;
    }

    async update() {
        await this.#feed.update();
        await this.#chats.update();
        await this.#profile.update();
    }

    #makeContext() {
        return {
            profile: {
                id:         this.#profile.id,
                name:       this.#profile.name,
                job:        this.#profile.job,
                education:  this.#profile.education,
                aboutMe:    this.#profile.aboutMe,
                linkImages: this.#profile.linkImages,
                age:        this.#profile.age,
            },
            chats: {
                // TODO: допилить чаты
            },
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
            }
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
                this.#currentUserFeed++;
                this.#view.context.feed.currentUserFeed = this.#currentUserFeed;
                this.#view.rerenderFeed();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    async control() {
        await this.update();
        this.#view.context = this.#makeContext();
        this.#view.render();
    }
}