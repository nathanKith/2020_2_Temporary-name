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

            const masks = new Masks();
            masks.render(this.#parent);

            const maskImages = document.getElementsByClassName('masks__img');
            maskImages.forEach((mask) => {
                mask.addEventListener(this.listenerMasks.type, this.listenerMasks.listener);
            });
        }

    }
}