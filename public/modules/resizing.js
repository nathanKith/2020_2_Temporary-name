import {router} from '../main';

export const isMobile = () => {
    return document.documentElement.clientWidth <= 1024;
}

export const resizeListener = (evt) => {
    const url = window.location.pathname;
    console.log(url);
    if (isMobile) {
        if (url.indexOf('/m') === -1) {
            if (url === '/login' || url === '/' || url === '/signup') {
                return;
            }
            router.redirect('/mfeed');
        }
    } else {
        if (url.indexOf('/m') !== -1) {
            if (url === '/login' || url === '/' || url === '/signup') {
                return;
            }
            router.redirect('/feed');
        }
    }
}
