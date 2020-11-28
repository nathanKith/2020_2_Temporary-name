import AlbumPhotoHbs from './AlbumPhoto.hbs'
import {popupPhoto} from '../../modules/popupPhoto'
import './Album.css'

export class AlbumPhoto {
    #parent
    photo
    listenerDelete

    constructor(parent) {
        this.#parent = parent;
    }

    async render() {
        // const feedContainer = document.getElementsByClassName('feed-container')[0];
        console.log(this.#parent.classList);
        this.#parent.classList.add('dark-photo');
        console.log(this.#parent.classList);
        console.log('я в ренедере')

        this.#parent.insertAdjacentHTML('afterbegin', AlbumPhotoHbs({
            photo: this.photo,
        }));

        document.getElementsByClassName('cancel-button')[0].addEventListener('click', popupPhoto);


        const deleteButton = document.getElementById('delete-button');
        await deleteButton.addEventListener(this.listenerDelete.type, this.listenerDelete.listener);

    }
}