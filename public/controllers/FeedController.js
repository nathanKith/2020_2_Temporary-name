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
        await this.#feed.update();
        await this.#chats.update();
        await this.#profile.update();
    }

    #makeContext() {
        return {
            profile: {
                id: this.#profile.id,
                name: this.#profile.name,
                job: this.#profile.job,
                education: this.#profile.education,
                aboutMe: this.#profile.aboutMe,
                linkImages: this.#profile.linkImages,
                age: this.#profile.age,
            },
            chats: {
                // TODO: допилить чаты
            },
            feed: {
                feed: this.#feed.userList,
            }
        };
    }

    async control() {
        this.#update();
        this.#view.context = this.#makeContext();
        this.#view.render();
    }
}