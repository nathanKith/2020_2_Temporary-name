import {LandingHeader} from "../LandingHeader/LandingHeader";

export class ProfileChatIcon {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const div = this.#createDiv('profile-chat-icons');

        const profile = this.#createDiv('profile-icon');
        const chats = this.#createDiv('chats-icon');

        const profileButton = document.createElement('button');
        profileButton.classList.add('profile-icon-button')
        profileButton.type = 'button';
        profileButton.innerHTML = `<img src="./../../img/profile.svg">`;

        const chatsButton = document.createElement('button');
        chatsButton.classList.add('chats-icon-button')
        chatsButton.type = 'button';
        chatsButton.innerHTML = `<img src="./../../img/chats.svg">`;

        profile.appendChild(profileButton);
        chats.appendChild(chatsButton);

        div.appendChild(profile);
        div.appendChild(chats);

        this.#parent.appendChild(div);

        return {
            profileButton: profileButton,
            chatsButton: chatsButton,
        };
    }

    #createDiv = (className) => {
        const div = document.createElement('div');
        div.classList.add(className);

        return div;
    }
}
