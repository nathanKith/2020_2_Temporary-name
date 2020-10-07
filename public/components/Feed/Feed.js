const backend = `http://95.163.213.222:8080`;

export default class Feed {
    #parent
    #data

    #currentPhoto

    constructor(parent) {
        this.#parent = parent;
        this.#currentPhoto = 0;
    }

    set data(data) {
        this.#data = data;
    }

    // прокинут feed-section
    render = () => {
        const div = document.createElement('div');
        div.classList.add('inner-feed-section');

        this.#parent.appendChild(div);

        div.appendChild(this.#createPhotosCell());
        div.appendChild(this.#createPersonProfile());
        div.appendChild(this.#createPreviousNextPhoto());
        div.appendChild(this.#createReactionButton());
    }

    #createPreviousNextPhoto = () => {
        const div = this.#createDiv('next-prev-photo');

        const prev = this.#createDiv('prev-photo');
        const buttonPrev= document.createElement('button');
        buttonPrev.type = 'button';

        const next = this.#createDiv('next-photo');
        const buttonNext = document.createElement('button');
        buttonNext.type = 'button';

        buttonNext.classList.add('next-prev-photo-button');
        buttonPrev.classList.add('next-prev-photo-button');
        
        buttonPrev.innerHTML = '';
        buttonNext.innerHTML = '';

        if (this.#data.linkImages.length > 1) {
            buttonNext.innerHTML = `<img src="./../../img/button-next.svg" />`;
        }

        const img = document.querySelector('#feedAvatar');

        buttonNext.addEventListener('click', (evt) => {
            this.#currentPhoto++;
            if (this.#currentPhoto === this.#data.linkImages.length - 1) {
                buttonNext.innerHTML = '';
            }
            buttonPrev.innerHTML = `<img class="inner-prev-photo" src="./../../img/button-next.svg">`;
            document.getElementById(`cell-${this.#currentPhoto - 1}`).classList.remove('cell-on');
            document.getElementById(`cell-${this.#currentPhoto}`).classList.add('cell-on');
            img.src = backend + this.#data.linkImages[this.#currentPhoto];
        });

        buttonPrev.addEventListener('click', (evt) => {
            this.#currentPhoto--;
            if (this.#currentPhoto === 0) {
                buttonPrev.innerHTML = '';
            }
            buttonNext.innerHTML = `<img src="./../../img/button-next.svg"/>`;
            document.getElementById(`cell-${this.#currentPhoto + 1}`).classList.remove('cell-on');
            document.getElementById(`cell-${this.#currentPhoto}`).classList.add('cell-on');
            img.src = backend + this.#data.linkImages[this.#currentPhoto];
        });

        next.appendChild(buttonNext);
        prev.appendChild(buttonPrev);

        div.appendChild(prev);
        div.appendChild(next);

        return div;
    }

    #createReactionButton = () => {
        const icons = [
            './../../img/go-back-arrow.svg',
            './../../img/cancel.svg',
            './../../img/like.svg',
            './../../img/super-like.svg',
        ]

        const div = this.#createDiv('reactions');

        icons.forEach((imgSrc) => {
            const button = document.createElement('button');
            button.classList.add('reaction-button');
            button.innerHTML += `<img src="${imgSrc}">`;
            button.addEventListener('click', (evt) => {
                this.#currentPhoto = 0;
            })

            div.appendChild(button);
        });

        return div;
    }

    #createPhotosCell = () => {
        const div = this.#createDiv('photos-cell');

        for (let i = 0; i < this.#data.linkImages.length; ++i) {
            const cell = this.#createDiv('cell');
            cell.id = `cell-${i}`;
            div.appendChild(cell);
        }

        div.querySelector('#cell-0').classList.add('cell-on');

        return div;
    }

    #createPersonProfile = () => {
        const div = this.#createDiv('profile-person');

        const currentImg = document.createElement('img');
        currentImg.id = 'feedAvatar';
        currentImg.src = backend + this.#data.linkImages[0];
        div.appendChild(currentImg);

        const profileInfo = this.#createDiv('profile-information');
        profileInfo.appendChild(this.#createSpan(
            'name',
            `${this.#data.name} <span id="age">${this.#data.age}</span>`
        ));
        profileInfo.appendChild(this.#createSpan('university-work', `${this.#data.education === '' ? this.#data.job : this.#data.education}`));
        profileInfo.appendChild(this.#createSpan('about-me', `${this.#data.aboutMe}`));
        div.appendChild(profileInfo);

        const infoLogo = this.#createDiv('information-logo');

        const link = document.createElement('a');
        link.href = '#';
        link.innerHTML += `<img src="./../../img/info.svg">`;

        infoLogo.appendChild(link);
        div.appendChild(infoLogo);

        return div;
    }

    #createDiv = (className) => {
        const div = document.createElement('div');
        div.classList.add(className);

        return div;
    }

    #createSpan = (id, text, className = null) => {
        const span = document.createElement('span');
        span.id = id;
        span.innerHTML = text;
        if (className) {
            span.classList.add(className);
        }

        return span;
    }
}