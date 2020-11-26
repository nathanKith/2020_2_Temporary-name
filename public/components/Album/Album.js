import AlbumImg from './AlbumImg.hbs'
import AlbumPreview from './AlbumPreview.hbs'
import AlbumButtons from './AlbumButtons.hbs'
import readImage from '../../modules/previewAvatar'

export class Album {
    #parent
    #listImages
    constructor(parent, listImages) {
        this.#parent = parent;
        this.#listImages = listImages;
    }

    render = () => {
        this.#parent.innerHTML = '';

        const albumSection = document.createElement('div');
        albumSection.classList.add('album-section');
        this.#parent.appendChild(albumSection);


        albumSection.insertAdjacentHTML('beforeend', AlbumPreview());

        this.#listImages.forEach( (image) => {
            albumSection.insertAdjacentHTML('beforeend', AlbumImg({
                photo: image,
            }));
        } )

    }

    newPhoto() {

    }
}