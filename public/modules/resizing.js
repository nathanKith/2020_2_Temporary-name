import {router} from '../main';

export const isMobile = () => {
    return window.innerWidth <= 1024;
}

export const resizeListener = (evt) => {
    const url = window.location.pathname;
    if (isMobile) {
        if (url.indexOf('/m') === -1 && (url !== '/login' || url !== '/signup')) {
            router.redirect('/mfeed');
        }
    } else {
        if (url.indexOf('/m') !== -1 && (url !== '/login' || url !== '/signup')) {
            router.redirect('/feed');
        }
    }
}
