import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';
import {router} from "../main";

export class FeedController {
    #view
    #profile
    #feed
    #chats

    #currentUserFeed

    constructor(feedView, userModel, feedListModel, chatListModel) {
        this.#view = feedView;
        this.#profile = userModel;
        this.#feed = feedListModel;
        this.#chats = chatListModel;

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
                chats: this.#chats.chatList,
                user_id: this.#profile.id,
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
            },
            settings: {
                settings: {
                    id:         this.#profile.id,
                    telephone:  this.#profile.telephone,
                    name:       this.#profile.name,
                    job:        this.#profile.job,
                    education:  this.#profile.education,
                    aboutMe:    this.#profile.aboutMe,
                    linkImages: this.#profile.linkImages,
                    age:        this.#profile.age,
                },
                event: {
                    logout: {
                        type: 'click',
                        listener: this.logoutListener.bind(this),
                    },
                    save: {
                        type: 'click',
                        listener: this.editUserListener.bind(this),
                    }
                },
                validate: {
                    passwords: {
                        message: '',
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

    async logoutListener(evt) {
        evt.preventDefault();
        await ajax.post(backend.logout, {})
            .then(({status, responseObject}) => {
                if (status === 500 || status === 401) {
                    throw new Error(`${status} logout error`);
                }
                router.redirect('/');
            })
            .catch((err) => {
                console.log(err.message);
                router.redirect('/');
            });
    }

    async editUserListener(evt) {
        evt.preventDefault();
        const data = this.#view.getSettingsData();
        if (data.password !== data.repeatPassword) {
            this.#view.context.settings.validate.passwords.message = 'Пароли не совпадают';
            this.#view.rerenderSettings();
            return;
        }

        await ajax.post(backend.settings, data)
            .then(({status, responseObject}) => {
                if (status === 400) {
                    throw new Error(`${status} settings error: bad request to server on /settings`);
                }
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot post json on /settings`);
                }
            })
            .catch((err) => {
                console.log()
            });
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
                console.log(this.#view.context);
                this.#view.render();
            });
    }
}