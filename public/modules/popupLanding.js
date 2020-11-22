import {router} from '../main';

export function popupLanding(evt) {
    evt.preventDefault();
    const app = document.getElementById('application');
    app.removeEventListener('click', popupLanding);
    router.redirect('/');
}
