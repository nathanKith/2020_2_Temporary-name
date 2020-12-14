/* eslint-disable */

const firebaseConfig = {
    apiKey: 'AIzaSyDEr5rJ-ZGsmhRz4KmZHuY-D0_feP9FdCs',
    authDomain: 'miami-8ea9c.firebaseapp.com',
    projectId: 'miami-8ea9c',
    storageBucket: 'miami-8ea9c.appspot.com',
    messagingSenderId: '425661437081',
    appId: '1:425661437081:web:be89aa1aa20ccbdcd35408'
};

firebase.initializeApp(firebaseConfig);

firebase.auth().language = 'ru';

export function generateRecaptcha() {
    window.recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    window.recaptcha.render()
        .then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
        });
}

export function sendSms(phoneNumber, appVerifier) {
    firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirm) => {
            window.confirmResult = confirm;
        });
}

export function loginWithCode(code) {
    window.confirmResult
        .confirm(code)
        .then((result) => {
            const user = result.user;
            console.log('number:', user.phoneNumber, ' ', user.uid);
        });
}
