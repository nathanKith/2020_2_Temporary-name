import {LandingHeader} from '../LandingHeader/LandingHeader';
import './ProfileChatIcon.css';

export class ProfileChatIcon {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const div = this.#createDiv('profile-chat-icons');

        const profile = this.#createDiv('profile-icon');
        const chats = this.#createDiv('chats-icon');
        const feed = this.#createDiv('feed-icon');

        const profileButton = document.createElement('button');
        profileButton.classList.add('profile-icon-button');
        profileButton.type = 'button';
        profileButton.innerHTML = '<img src="./../../img/profile.svg">';

        const chatsButton = document.createElement('button');
        chatsButton.classList.add('chats-icon-button');
        chatsButton.type = 'button';
        chatsButton.innerHTML = '<img src="./../../img/chats.svg">';

        const feedButton = document.createElement('button');
        feedButton.classList.add('feed-icon__button');
        feedButton.type = 'button';
        feedButton.innerHTML = '<img src="./img/small_classic_label.png">';

        profile.appendChild(profileButton);
        chats.appendChild(chatsButton);
        feed.appendChild(feedButton);

        div.appendChild(profile);
        div.appendChild(chats);
        div.appendChild(feed);

        this.#parent.appendChild(div);

        return {
            profileButton: profileButton,
            chatsButton: chatsButton,
            feedButton: feedButton,
        };
    }

    #createDiv = (className) => {
        const div = document.createElement('div');
        div.classList.add(className);

        return div;
    }
}
