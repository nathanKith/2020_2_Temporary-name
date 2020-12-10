import {backend} from '../../modules/url';
import {yoomoney, yoomoneyUrl} from '../../modules/yoomoney';
import './Feed.css';

export class Feed {
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
        console.log(this.#data);
        const div = document.createElement('div');
        div.classList.add('inner-feed-section');

        this.#parent.appendChild(div);

        div.appendChild(this.#createPhotosCell());
        div.appendChild(this.#createPersonProfile());
        div.appendChild(this.#createPreviousNextPhoto());
        div.appendChild(this.#createReactionButton());

        const formBackUser = document.getElementById('back-user-form');
        formBackUser.addEventListener(this.#data.event.backUser.type, this.#data.event.backUser.listener);

        const buttons = document.getElementsByClassName('reaction-button');
        buttons[1].addEventListener(this.#data.event.dislike.type, this.#data.event.dislike.listener);
        buttons[2].addEventListener(this.#data.event.like.type, this.#data.event.like.listener);

        const formSuperLike = document.getElementById('super-like-form');
        formSuperLike.addEventListener(this.#data.event.superLike.type, this.#data.event.superLike.listener);
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

        if (this.#data.feed.linkImages.length > 1) {
            buttonNext.innerHTML = '<img src="./../../img/button-next.svg" />';
        }

        const img = document.querySelector('#feedAvatar');

        buttonNext.addEventListener('click', (evt) => {
            this.#currentPhoto++;
            if (this.#currentPhoto === this.#data.feed.linkImages.length - 1) {
                buttonNext.innerHTML = '';
            }
            buttonPrev.innerHTML = '<img class="inner-prev-photo" src="./../../img/button-next.svg">';
            document.getElementById(`cell-${this.#currentPhoto - 1}`).classList.remove('cell-on');
            document.getElementById(`cell-${this.#currentPhoto}`).classList.add('cell-on');
            img.src = this.#data.feed.linkImages[this.#currentPhoto];
        });

        buttonPrev.addEventListener('click', (evt) => {
            this.#currentPhoto--;
            if (this.#currentPhoto === 0) {
                buttonPrev.innerHTML = '';
            }
            buttonNext.innerHTML = '<img src="./../../img/button-next.svg"/>';
            document.getElementById(`cell-${this.#currentPhoto + 1}`).classList.remove('cell-on');
            document.getElementById(`cell-${this.#currentPhoto}`).classList.add('cell-on');
            img.src = this.#data.feed.linkImages[this.#currentPhoto];
        });

        next.appendChild(buttonNext);
        prev.appendChild(buttonPrev);

        div.appendChild(prev);
        div.appendChild(next);

        return div;
    }

    #createReactionButton = () => {
        const icons = [
            // './../../img/go-back-arrow.svg',
            './../../img/cancel.svg',
            './../../img/like.svg',
            // './../../img/super-like.svg',
        ];

        const div = this.#createDiv('reactions');

        const formBackUser = this.#createForm('back-user-form', './../../img/go-back-arrow.svg');
        div.appendChild(formBackUser);

        icons.forEach((imgSrc) => {
            const button = document.createElement('button');
            button.classList.add('reaction-button');
            button.innerHTML += `<img src="${imgSrc}">`;
            // button.addEventListener('click', (evt) => {
            //     this.#currentPhoto = 0;
            // })

            div.appendChild(button);
        });

        const formSuperLike = this.#createForm('super-like-form', './../../img/super-like.svg');
        div.appendChild(formSuperLike);

        return div;
    }

    #createForm(id, imgSrc) {
        const form = document.createElement('form');
        form.action = yoomoneyUrl;
        form.method = 'POST';
        form.id = id;

        const formJson = yoomoney.json();
        yoomoney.label = this.#data.id;
        Object.keys(formJson).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = formJson[key];

            form.appendChild(input);
        });

        const button = document.createElement('button');
        button.classList.add('reaction-button');
        button.type = 'submit';
        button.innerHTML = `<img src="${imgSrc}">`;

        form.appendChild(button);

        return form;
    }

    #createPhotosCell = () => {
        const div = this.#createDiv('photos-cell');

        for (let i = 0; i < this.#data.feed.linkImages.length; ++i) {
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
        currentImg.src = this.#data.feed.linkImages[0];
        div.appendChild(currentImg);

        const profileInfo = this.#createDiv('profile-information');
        profileInfo.appendChild(this.#createSpan(
            'name',
            `${this.#data.feed.name} <span id="age">${this.#data.feed.age}</span>`
        ));
        profileInfo.appendChild(this.#createSpan('university-work', `${this.#data.feed.education === '' ? this.#data.feed.job : this.#data.feed.education}`));
        profileInfo.appendChild(this.#createSpan('about-me', `${this.#data.feed.aboutMe}`));
        div.appendChild(profileInfo);

        const infoLogo = this.#createDiv('information-logo');
        infoLogo.id = 'information-logo';

        const link = document.createElement('a');
        link.innerHTML += '<img class="logo" src="./../../img/info.svg">';

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
