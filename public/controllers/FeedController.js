import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';
import {router} from '../main';
import {CommentModel} from '../models/CommentModel';
import ChatOtherMessage from '../components/ChatContent/ChatOtherMessage.hbs';
import {ChatModel} from '../models/ChatModel';
import {Chats} from '../components/Chats/Chats';
import {logoutFirebase} from '../modules/firebase';
import {tryRedirect} from '../modules/tryRedirect';
import {UserModel} from "../models/UserModel";


export class FeedController {
    #view
    #profile
    #feed
    #chats
    #comments
    #websocket

    #currentUserFeed
    #backUserClick

    constructor(feedView, userModel, feedListModel, chatListModel, commentsListModel) {
        this.#view = feedView;
        this.#profile = userModel;
        this.#feed = feedListModel;
        this.#chats = chatListModel;
        this.#comments = commentsListModel;

        this.#currentUserFeed = 0;
        this.#backUserClick = 0;
    }

    set view(view) {
        this.#view = view;
    }

    async updateWebsocket() {
        this.#websocket = await new WebSocket(backend.websocket);
        this.#websocket.onmessage = this.onMessageWebsocket.bind(this);
    }

    async update() {
        await this.updateWebsocket();
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
                chats: this.#chats.chatList,
                user_id: this.#profile.id,
                onSendWebsocket: this.onSendWebsocket.bind(this),
                getOtherComment: {
                    type: 'click',
                    listener: this.getOtherCommentsListener.bind(this),
                },
            },
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
            settings: {
                settings: {
                    id: this.#profile.id,
                    telephone: this.#profile.telephone,
                    name: this.#profile.name,
                    job: this.#profile.job,
                    education: this.#profile.education,
                    aboutMe: this.#profile.aboutMe,
                    linkImages: this.#profile.linkImages,
                    age: this.#profile.age,
                    filter: this.#profile.filter,
                },
                event: {
                    logout: {
                        type: 'click',
                        listener: this.logoutListener.bind(this),
                    },
                    save: {
                        type: 'click',
                        listener: this.editUserListener.bind(this),
                    },
                },
                validate: {
                    passwords: {
                        message: '',
                    },
                },
            },
            comments: {
                comments: this.#comments,
                profile: null,
                event: {
                    getComments: {
                        type: 'click',
                        listener: this.getUserCommentsListener.bind(this),
                    },
                    sendComment: {
                        type: 'click',
                        listener: this.sendCommentListener.bind(this),
                    },
                    getMyComments: {
                        type: 'click',
                        listener: this.getMyCommentsListener.bind(this),
                    },
                    sendMyComments: {
                        type: 'click',
                        listener: this.sendMyCommentsListener.bind(this),
                    },
                    getProfileByComment: {
                        type: 'click',
                        listener: this.getProfileByComment.bind(this),
                    },
                    getOtherComment: {
                        type: 'click',
                        listener: this.getOtherCommentsListener.bind(this),
                    },
                    sendOtherComment: {
                        type: 'click',
                        listener: this.sendOtherComments.bind(this),
                    },
                },
            },
            albums: {
                savePhoto: {
                    type: 'click',
                    listener: this.savePhotoListener.bind(this),
                },
                cancelPhoto: {
                    type: 'click',
                    listener: this.cancelPhotoListener.bind(this),
                },
                deletePhoto: {
                    type: 'click',
                    listener: this.deletePhotoListener.bind(this),
                },
                overlayMask: {
                    type: 'click',
                    listener: this.overlayMaskListener.bind(this),
                }
            }
        };
    }

    async overlayMaskListener(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();

        await ajax.post(backend.mask, {
            linkImages: document.getElementById('current-photo').src,
            mask: evt.target.id,
        })
            .then(async ({status, responseObject}) => {
                if (status !== 200) {
                    throw new Error(`${status} error on url /mask`);
                }

                const masks = document.getElementsByClassName('masks__mask');
                for (const mask of masks) {
                    mask.classList.remove('masks__mask_focused');
                }

                const maskImage = document.getElementById(evt.target.id);
                maskImage.parentElement.classList.add('masks__mask_focused');

                const albumImg = document.getElementById('current-photo');
                albumImg.src = responseObject['linkImages'];

                await this.#profile.update();
                this.#view._context['profile'].linkImages = this.#profile.linkImages;
                this.#view.renderMyAlbum();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    onSendWebsocket(user_id, chat_id, message, delivery) {
        const mes = {
            user_id: user_id,
            chat_id: chat_id,
            message: message,
            timeDelivery: delivery,
        };
        this.#websocket.send(JSON.stringify(mes));
        const scroll = document.getElementById('chat-box-text-area');
        scroll.scrollTop = scroll.scrollHeight;
    }

    pushEvent = () => {
        const chatsIcon = document.getElementsByClassName('chats-icon-button')[0];
        chatsIcon.classList.add('change-chat-icon');
    }

    onMessageWebsocket({ data }) {
        const dataJSON = JSON.parse(data);
        console.log(dataJSON);
        console.log('get message');
        const chatModel = new ChatModel(dataJSON);
        const innerListChats = document.getElementsByClassName('inner-list-chats')[0]; // означает что отрисованы чаты
        const message = document.getElementById('chat-box-text-area');//означает что отрисован какой то чат
        const comments = document.getElementById('comments');//означает, что отрисованы комменты
        const profile = document.getElementsByClassName('profile')[0];// означает, что отрисован профиль

        if (innerListChats) {
            const chatList = this.#chats.chatList;
            const newChat = chatList.find((chat) => {
                return chat.id === chatModel.id;
            });
            console.log(newChat);
            if (!newChat) {
                const profileChatSection = document.getElementsByClassName('profile-chat-section')[0];
                const chats = new Chats(profileChatSection);
                chats.data = this.#makeContext()['chats'];

                innerListChats.appendChild(chats.createChat(chatModel));
                console.log(chatModel);
                this.#chats.appendChat(chatModel);
                const nc = document.getElementById('chat' + chatModel.id);
                nc.classList.add('chats-new');
            } else {
                const oldChat = document.getElementById('chat' + newChat.id);
                oldChat.classList.add('chats-new');
            }
        }

        if (message) {
            const chat = document.getElementById(chatModel.id);
            if (chat) {
                message.insertAdjacentHTML('beforeend', ChatOtherMessage({
                    message_text: dataJSON.messages[0].message,
                    time_delivery: dataJSON.messages[0].timeDelivery,
                }));
                const scroll = document.getElementById('chat-box-text-area');
                scroll.scrollTop = scroll.scrollHeight;
            } else {
                this.pushEvent();
            }
        }

        if (comments) {
            this.pushEvent();
        }

        if (profile) {
            this.pushEvent();
        }

        // const scroll = document.getElementById('chat-box-text-area');
        // scroll.scrollTop = scroll.scrollHeight;
    }

    async getProfileByComment(evt) {
        evt.preventDefault();

        const userID = evt.target.id;
        const comment = this.#comments.commentsList.find((comment) => {
            console.log(comment.user.id);
            return comment.user.id == userID;
        }, this);

        this.#view.context.otherProfile = {
            id: comment.user.id,
            name: comment.user.name,
            job: comment.user.job,
            education: comment.user.education,
            aboutMe: comment.user.aboutMe,
            linkImages: comment.user.linkImages,
            age: comment.user.age,
        };
        this.#view.renderOtherProfile();

        const comments = document.getElementById('profile-comments');
        comments.addEventListener('click', async (evt) => {
            evt.preventDefault();
            await this.#comments.update(comment.user.id);
            this.#view.renderComments();

            const send = document.getElementById('send-comment');
            send.addEventListener('click', async (evt) => {
                evt.preventDefault();
                const comment = new CommentModel({
                    user: this.#profile,
                    commentText: document.getElementById('text-comment').value,
                    timeDelivery: new Date().getHours() + ':' + new Date().getMinutes(),
                });
                await comment.addComment(comment.user.id);
                this.#view.context.comments.comments.commentsList.push(comment);
                this.#view.renderComments();
            });
        });
    }

    async savePhotoListener(evt) {
        console.log('я навесился!');
        evt.preventDefault();
        const save = document.getElementById('save');
        const photo = document.getElementById('file');
        if (photo.value) {
            console.log('фото загружено');
            save.innerHTML = 'Сохранить';
            if (photo.files[0].size > 5000000) {
                save.innerHTML = 'Слишком большой размер фото, пожалуйста, выберите фото размера менее 5Мб';
                return;
            }
            save.disabled = true;
            save.innerHTML = 'Загружаем...';


            await this.#profile.addPhoto(document.getElementById('send'))
                .then( ({status, responseObject}) => {
                    if (status === 200) {
                        console.log('я разрезолвился!');
                        console.log(responseObject);
                        const link = responseObject['linkImages'];
                        this.#profile.appendLinkImages(link);
                        this.#view._context['profile'].linkImages = this.#profile.linkImages;
                        this.#view.renderMyAlbum();
                        // const albumSection = document.getElementsByClassName('album-section')[0];
                        // albumSection.insertAdjacentHTML('beforeend', AlbumImg({
                        //     photo: link,
                        // }));
                        this.cancelPhotoListener();
                    } else if (status === 400){
                        throw new Error('Слишком большой размер фото');
                    } else if (status === 403) {
                        throw new Error('Пожалуйста, загрузите фото с вашим лицом');
                    } else {
                        throw new Error('Не удалось загрузить фото(');
                    }
                }).catch( (err) => {
                    save.innerHTML = err.message;
                    save.disabled = false;
                });
        } else {
            save.innerHTML = 'Выберите фото!';
            return;
        }
    }

    cancelPhotoListener () {
        const photo = document.getElementById('file');
        photo.value = '';
        const preview = document.getElementById('preview');
        preview.src = './img/plus.svg';
        const buttons = document.getElementsByClassName('album-buttons')[0];
        document.getElementsByClassName('feed-section')[0].removeChild(buttons);
    }

    async deletePhotoListener(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        console.log('deleting photo');
        const photo = document.getElementById('current-photo');
        const images = this.#profile.linkImages;

        if (images.length === 1 ) {
            alert('Ай, низя удалять последнюю фотку!');
            return;
        }
        console.log(photo.src);

        await this.#profile.deletePhoto(photo.src)
            .then( ({status, responseObject}) => {
                if (status === 200) {
                    const feedContainer = document.getElementsByClassName('feed-container')[0];
                    feedContainer.classList.remove('dark-photo');

                    const photoView = document.getElementsByClassName('photo-view')[0];
                    feedContainer.removeChild(photoView);

                    this.#profile.deleteImage(photo.src);
                    this.#view._context['profile'].linkImages = this.#profile.linkImages;
                    this.#view.renderMyAlbum();
                } else {
                    throw new Error('ошибка удаления');
                }
            }).catch( (err) => {
                console.log(err.message);
            });
    }

    async getMyCommentsListener(evt) {
        evt.preventDefault();
        await this.#comments.update(this.#profile.id);
        const feedSection = document.getElementsByClassName('feed-section')[0];
        feedSection.classList.remove('dark');
        this.#view.renderMyAlbum();
        this.#view.renderComments(true);
    }

    async getUserCommentsListener(evt) {
        evt.preventDefault();
        await this.#comments.update(this.#feed.userList[this.#currentUserFeed].id);
        this.#view.renderAlbum();
        this.#view.renderComments();
    }

    async getOtherCommentsListener(evt) {
        evt.preventDefault();
        const profileId = document.getElementsByClassName('profile')[0];
        this.#view._context['comments']['profile'] = profileId.id;
        await this.#comments.update(profileId.id);
        const user = new UserModel();
        await user.updateOtherUser(profileId.id);

        this.#view.renderOtherAlbum(user);
        this.#view.renderOtherComments();
    }

    async sendOtherComments(evt) {
        evt.preventDefault();
        if (!this.validationComments()) {
                return;
        }
        // if (!document.getElementById('text-comment').value) {
        //     return;
        // }
        // const text = document.getElementById('text-comment').value;
        // let textComments = text.replaceAll(' ', '');
        // if (textComments === '') {
        //     return;
        // }

        const comment = new CommentModel({
            user: this.#profile,
            commentText: document.getElementById('text-comment').value,
            timeDelivery: '',
        });
        await comment.addComment(parseInt(this.#view._context['comments']['profile'], 10));
        this.#view.context.comments.comments.commentsList.push(comment);
        this.#view.renderOtherComments();
    }

    validationComments() {
        if (!document.getElementById('text-comment').value) {
            return false
        }
        const text = document.getElementById('text-comment').value;
        let textComments = text.replaceAll(' ', '');
        if (textComments === '') {
            return false;
        }
        return true;
    }

    async sendCommentListener(evt) {
        evt.preventDefault();
        if (!this.validationComments()) {
            return;
    }

        const comment = new CommentModel({
            user: this.#profile,
            commentText: document.getElementById('text-comment').value,
            timeDelivery: '',
        });
        await comment.addComment(this.#feed.userList[this.#currentUserFeed].id);
        this.#view.context.comments.comments.commentsList.push(comment);
        this.#view.renderComments();
    }

    async sendMyCommentsListener(evt) {
        evt.preventDefault();
        if (!this.validationComments()) {
            return;
        }

        const comment = new CommentModel({
            user: this.#profile,
            commentText: document.getElementById('text-comment').value,
            timeDelivery: '',
        });
        await comment.addComment(this.#profile.id);
        this.#view.context.comments.comments.commentsList.push(comment);
        this.#view.renderComments(true);
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
        logoutFirebase()
            .then(async () => {
                await ajax.post(backend.logout, {})
                    .then(({ status, responseObject }) => {
                        if (status === 500 || status === 401) {
                            throw new Error(`${status} logout error`);
                        }
                        router.redirect('/');
                    })
                    .catch((err) => {
                        console.log(err.message);
                        router.redirect('/');
                    });
            })
            .catch((err) => {
                console.log(err.message);
                router.redirect('/');
            });
    }

    async editUserListener(evt) {
        evt.preventDefault();
        const data = this.#view.getSettingsData();

        await ajax.post(backend.settings, data)
            .then(async ({ status, responseObject }) => {
                if (status === 400) {
                    throw new Error(`${status} settings error: bad request to server on /settings`);
                }
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot post json on /settings`);
                }

                const saveButton = document.getElementById('save-button');
                saveButton.classList.add('pink-save');

                await this.#profile.update();
                await this.#feed.update();
                
                this.#view.context = this.#makeContext();
                this.#view.rerenderFeed();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    async #getNextUser() {
        if (this.#currentUserFeed === this.#feed.userList.length - 1) {
            await this.#feed.update();
            this.#currentUserFeed = 0;
        } else {
            this.#currentUserFeed++;
        }

        this.#view.context = this.#makeContext();
        this.#view.rerenderFeed();
    }

    #getPreviousUser() {
        if (this.#currentUserFeed === 0) {
            return;
        }
        this.#currentUserFeed--;

        this.#view.context = this.#makeContext();
        this.#view.rerenderFeed();
    }

    async #likeDislikeAjax(url) {
        await ajax.post(url, {
            'user_id2': this.#feed.userList[this.#currentUserFeed].id
        })
            .then(async ({ status, responseObject }) => {
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot get json on url /like`);
                }

                await this.#getNextUser();
                this.#backUserClick = 0;
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    async superLikeListener(evt) {
        if (this.#profile.isPremium) {
            evt.preventDefault();
            await ajax.post(backend.superLike, {
                'user_id2': this.#feed.userList[this.#currentUserFeed].id,
            })
                .then(async ({ status, responseObject }) => {
                    if (status === 401) {
                        throw new Error(`${status} unauthorized: cannot get json on url /like`);
                    }

                    await this.#getNextUser();
                    this.#backUserClick = 0;
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
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
        const isAuth = await tryRedirect();
        if (!isAuth) {
            router.redirect('/');
            return;
        }

        await this.update()
            .then(() => {
                this.#view.context = this.#makeContext();
                this.#view.render();
                // yoomoney.label = `${this.#profile.id}`;
                // console.log(yoomoney.json());
            });
    }
}
