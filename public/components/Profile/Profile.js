export default class Profile {

    #parent
    #data

    constructor(parent) {
        this.#parent = parent;
    }

    set data(data) {
        this.#data = data;
    }

    render() {
        const div = this.#createDiv('profile');
        const innerDiv = this.#createDiv('inner-profile');
        div.appendChild(innerDiv);

        innerDiv.innerHTML += `<img src="${this.#data.linkImages? this.#data.linkImages[0]: './../../img/pretty-girl.svg'}">`;

        const profileInfo = this.#createDiv('my-profile-information');
        innerDiv.appendChild(profileInfo);

        const nameAge = this.#createSpan('my-name', `${this.#data.name}  <span id="my-age">${this.#data.age}</span>`);
        const universityWork = this.#createSpan('my-university-work', `${this.#data.education === '' ? this.#data.job : this.#data.education}`);
        const aboutMe = this.#createSpan('my-about-me', `${this.#data.aboutMe}`);

        profileInfo.appendChild(nameAge);
        profileInfo.appendChild(universityWork);
        profileInfo.appendChild(aboutMe);

        this.#parent.appendChild(div);
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