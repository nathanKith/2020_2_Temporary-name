import AlbumImg from './AlbumImg.hbs';
import AlbumPreview from './AlbumPreview.hbs';
import AlbumButtons from './AlbumButtons.hbs';
import {readImage} from '../../modules/previewAvatar';
import {AlbumPhoto} from './../AlbumPhoto/AlbumPhoto';
import {popupPhoto} from '../../modules/popupPhoto';
import './Album.css';

export class Album {
    #parent
    #listImages
    #isMy
    listenerSave
    listenerCancel
    listenerDelete

    set isMy(isMy){
        this.#isMy = isMy;
    }

    constructor(parent, listImages) {
        this.#parent = parent;
        this.#listImages = listImages;
        this.#isMy = false;
    }

    render = () => {
        this.#parent.innerHTML = '';

        const albumSection = document.createElement('div');
        albumSection.classList.add('album-section');
        this.#parent.appendChild(albumSection);

        if(this.#isMy) {
            albumSection.insertAdjacentHTML('beforeend', AlbumPreview());
        }


        this.#listImages.forEach( (image, index) => {
            albumSection.insertAdjacentHTML('beforeend', AlbumImg({
                photo: image,
            }));
            let ind = 0;
            if (this.#isMy) {
                ind = 1;
            }
            const albumPhoto = document.getElementsByClassName('album-img')[index + ind];
            albumPhoto.addEventListener('click', async (evt) => {
                evt.preventDefault();
                const feedContainer = document.getElementsByClassName('feed-container')[0];
                const photoFromAlbum = new AlbumPhoto(feedContainer);
                photoFromAlbum.photo = image;
                photoFromAlbum.listenerDelete = this.listenerDelete;
                photoFromAlbum.isMy = this.#isMy;
                if (this.#listImages.length === 1){
                    photoFromAlbum.isMy = false;
                }
                await photoFromAlbum.render()
                    .then(() => {
                    // const photo = document.getElementsByClassName('photo-view')[0];
                    // photo.addEventListener('click', (evt) => {
                    //     evt.stopPropagation();
                    // });
                    // document.getElementsByClassName('feed-container')[0].addEventListener('click', popupPhoto);
                    // document.getElementById('application').addEventListener('click', popupPhoto);
                    });
            });
        });

        if(this.#isMy) {
            const photo = document.getElementById('file');
            photo.onchange = () => {
                const file = document.getElementById('file').files[0];
                readImage(file);
                const buttons = document.getElementsByClassName('album-buttons')[0];
                if (!buttons) {
                    this.#parent.insertAdjacentHTML('afterbegin', AlbumButtons());
                    document.getElementById('save').addEventListener(this.listenerSave.type,
                        this.listenerSave.listener);
                    document.getElementById('delete').addEventListener(this.listenerCancel.type,
                        this.listenerCancel.listener);
                }
            };
        }
    }


}