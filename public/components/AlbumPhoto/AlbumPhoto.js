import AlbumPhoto from './AlbumPhoto.hbs'
import {popupPhoto} from '../../modules/popupPhoto'

export class AlbumPhoto {
    #parent
    photo
    listenerDelete

    constructor(parent) {
        this.#parent = parent;
    }

    render = () => {
        // const feedContainer = document.getElementsByClassName('feed-container')[0];
        this.#parent.classList.add('dark-photo');

        this.#parent.insertAdjacentHTML('afterbegin', AlbumPhoto({
            photo: this.photo,
        }));

        document.getElementById('application').addEventListener('click', popupPhoto);
        const photo = document.getElementsByClassName('photo-view')[0];
        photo.addEventListener('click', (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
        })

        document.getElementsByClassName('cancel-button')[0].addEventListener('click', popupPhoto);


        const deleteButton = document.getElementById('delete-button');
        deleteButton.addEventListener(this.listenerDelete.type, this.listenerDelete.deletePhoto);

    }
}