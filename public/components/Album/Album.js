import AlbumImg from './AlbumImg.hbs'

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

        this.#listImages.forEach( (image) => {
            albumSection.insertAdjacentHTML('beforeend', AlbumImg({
                photo: image,
            }));
        } )

        albumSection.insertAdjacentHTML('beforeend', AlbumImg({
            photo: './plus.svg',
        }));
    }

    newPhoto() {

    }
}