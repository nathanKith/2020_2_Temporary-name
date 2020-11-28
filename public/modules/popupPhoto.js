export function popupPhoto(evt) {
    evt.preventDefault();
    const app = document.getElementById('application');
    app.removeEventListener('click', popupPhoto);

    const feedContainer = document.getElementsByClassName('feed-container')[0];
    feedContainer.classList.remove('dark-photo');

    const photo = document.getElementsByClassName('photo-view')[0];
    feedContainer.removeChild(photo);
}
