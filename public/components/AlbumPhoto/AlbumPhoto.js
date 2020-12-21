import AlbumPhotoHbs from './AlbumPhoto.hbs';
//import {popupPhoto} from '../../modules/popupPhoto';
import './Album.css';
import {Masks} from '../Masks/Masks';

export class AlbumPhoto {
    #parent
    photo
    listenerDelete
    listenerMasks
    isMy
    forMask

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        // const feedContainer = document.getElementsByClassName('feed-container')[0];
        console.log(this.#parent.classList);
        this.#parent.classList.add('dark-photo');
        console.log(this.#parent.classList);
        console.log('я в рендере');

        this.#parent.insertAdjacentHTML('afterbegin', AlbumPhotoHbs({
            photo: this.photo,
        }));

        if(!this.isMy) {
            const photoButtons = document.getElementsByClassName('photo-buttons')[0];
            const basket = document.getElementById('basket-button');
            photoButtons.removeChild(basket);
        }

        document.getElementsByClassName('cancel-button')[0].addEventListener('click', (evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
            const feedContainer = document.getElementsByClassName('feed-container')[0];
            feedContainer.classList.remove('dark-photo');

            const photo = document.getElementsByClassName('photo-view')[0];
            feedContainer.removeChild(photo);
        });

        if(this.isMy) {
            const deleteButton = document.getElementById('delete-button');
            deleteButton.addEventListener(this.listenerDelete.type, this.listenerDelete.listener);
        }

        if (this.forMask) {
            const photoView = document.getElementsByClassName('photo-view')[0];
            const masks = new Masks(photoView);
            masks.render();

            const maskImages = document.getElementsByClassName('masks__img');
            for (const mask of maskImages) {
                mask.addEventListener(this.listenerMasks.type, this.listenerMasks.listener);
            }
        }
    }
}
