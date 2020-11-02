import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';

export class FeedController {
    #view
    #profile
    #feed
    #chats

    constructor(feedView, userModel, feedListModel, chatModel) {
        this.#view = feedView;
        this.#profile = userModel;
        this.#feed = feedListModel;
        this.#chats = chatModel;
    }

    async update() {
        await this.#profile.update();
        await this.#chats.update();
        await this.#feed.update();
    }

    #makeContext() {
        return {

        };
    }

    async control() {
        this.#update();
        this.#view.context = this.#makeContext();
        this.#view.render();
    }
}