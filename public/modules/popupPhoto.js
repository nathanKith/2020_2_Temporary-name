export function popupPhoto(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    evt.stopImmediatePropagation();
    document.getElementById('application').removeEventListener('click', popupPhoto);

    const feedContainer = document.getElementsByClassName('feed-container')[0];
    feedContainer.classList.remove('dark-photo');

    const photo = document.getElementsByClassName('photo-view')[0];
    if (photo) {
        feedContainer.removeChild(photo);
    }
}
