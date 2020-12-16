import './ProfileChatIcon.css';

export class ProfileChatIcon {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        const div = this.#createDiv('profile-chat-icons');

        const profile = this.#createDiv('profile-icon');
        profile.classList.add('tooltip');

        const chats = this.#createDiv('chats-icon');
        chats.classList.add('tooltip-chat');

        const feed = this.#createDiv('feed-icon');
        feed.classList.add('tooltip');

        const profileButton = document.createElement('button');
        profileButton.classList.add('profile-icon-button');
        profileButton.type = 'button';
        profileButton.innerHTML = '<img src="./../../img/profile.svg">';

        const toolTipProfile = document.createElement('span');
        toolTipProfile.classList.add('tooltiptext');
        toolTipProfile.innerText = 'Профиль';

        const chatsButton = document.createElement('button');
        chatsButton.classList.add('chats-icon-button');
        chatsButton.type = 'button';
        chatsButton.innerHTML = '<img src="./../../img/chats.svg">';

        const toolTipChat = document.createElement('span');
        toolTipChat.classList.add('tooltiptext');
        toolTipChat.innerText = 'Сообщения';

        const feedButton = document.createElement('button');
        feedButton.classList.add('feed-icon__button');
        feedButton.type = 'button';
        feedButton.innerHTML = '<img src="./img/small_classic_label.png">';

        const toolTipFeed = document.createElement('span');
        toolTipFeed.classList.add('tooltiptext');
        toolTipFeed.innerText = 'Лента';

        profile.appendChild(profileButton);
        profile.appendChild(toolTipProfile);

        chats.appendChild(chatsButton);
        chats.appendChild(toolTipChat);

        feed.appendChild(feedButton);
        feed.appendChild(toolTipFeed);

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
