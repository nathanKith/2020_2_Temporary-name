import {AlbumMobileView} from "../views/AlbumMobileView";
import {UserModel} from "../models/UserModel";

export class AlbumMobileController {
    #view
    #profile
    #otherProfile

    constructor(view, userModel) {
        this.#view = view;
        this.#profile = userModel;
        this.#otherProfile = new UserModel();
    }

    async update(userId) {
        await this.#profile.update();
        await this.#otherProfile.updateOtherUser(userId);
    }

    #makeContext() {
        return {
            albums: {
                linkImages: this.#otherProfile.linkImages,
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
            },
        };
    }

    async savePhotoListener(evt) {
        evt.preventDefault();
        const save = document.getElementById('save');
        const photo = document.getElementById('file');
        if (photo.value) {
            console.log('фото загружено')
            save.innerHTML = 'Сохранить';
            await this.#otherProfile.addPhoto(document.getElementById('send'))
                .then( ({status, responseObject}) => {
                    if (status === 200) {
                        console.log('я разрезолвился!')
                        console.log(responseObject);
                        const link = responseObject['linkImages'];
                        this.#otherProfile.appendLinkImages(link);
                        this.#view._context['albums'].linkImages = this.#otherProfile.linkImages;
                        this.#view.render(true);
                        this.cancelPhotoListener();
                    } else if (status === 400){
                        throw new Error('Слишком большой размер фото')
                    } else {
                        throw new Error('Не удалось загрузить фото(')
                    }
                }).catch( (err) => {
                    save.innerHTML = err.message;
                })
        } else {
            save.innerHTML = 'Выберите фото!';
            return;
        }
    }

    cancelPhotoListener () {
        const photo = document.getElementById('file');
        photo.value = '';
        const preview = document.getElementById('preview');
        preview.src = '../img/plus.svg';
        const buttons = document.getElementsByClassName('album-buttons')[0];
        document.getElementsByClassName('profile-chat-section')[0].removeChild(buttons);
    }

    async deletePhotoListener(evt) {
        evt.preventDefault();
        console.log('deleting photo')
        const photo = document.getElementById('current-photo');
        const images = this.#otherProfile.linkImages;

        if (images.length === 1 ) {
            alert('Ай, низя удалять последнюю фотку!');
            return;
        }
        console.log(photo.src);

        await this.#otherProfile.deletePhoto(photo.src)
            .then( ({status, responseObject}) => {
                if (status === 200) {
                    const feedContainer = document.getElementsByClassName('feed-container')[0];
                    feedContainer.classList.remove('dark-photo');

                    const photoView = document.getElementsByClassName('photo-view')[0];
                    feedContainer.removeChild(photoView);

                    this.#otherProfile.deleteImage(photo.src);
                    this.#view._context['albums'].linkImages = this.#otherProfile.linkImages;
                    this.#view.render(true);
                } else {
                    throw new Error('ошибка удаления');
                }
            }).catch( (err) => {
                console.log(err.message);
            });
    }

    async control(userId) {
        await this.update(userId);

        let isMy = false;
        if (this.#profile.id === this.#otherProfile.id) {
            isMy = true;
        }

        this.#view.context = this.#makeContext();
        this.#view.render(isMy);
    }

}