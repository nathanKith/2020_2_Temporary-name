import {router} from '../main';

export const isMobile = () => {
    return document.documentElement.clientWidth <= 1024;
}

export const resizeListener = (evt) => {
    const url = window.location.pathname;
    if (isMobile) {
        if (url.indexOf('/m') === -1) {
            router.redirect('/mfeed');
        }
    } else {
        if (url.indexOf('/m') !== -1) {
            router.redirect('/feed');
        }
    }
}
