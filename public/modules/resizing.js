import {router} from '../main';

export const isMobile = () => {
    return document.documentElement.clientWidth <= 1024;
};

export const resizeListener = (evt) => {
    //console.log(url);
    if (isMobile) {
        const url = window.location.pathname;
        if (url.indexOf('/m') === -1) {
            if (url === '/login' || url === '/' || url === '/signup') {
                return;
            }
            router.redirect('/mfeed');
        }
    } else {
        const url = window.location.pathname;
        if (url.indexOf('/m') !== -1) {
            router.redirect('/feed');
        }
    }
};
