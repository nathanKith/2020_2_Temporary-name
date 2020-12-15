/* eslint-disable */

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

export function logoutFirebase() {
    return firebase.auth().signOut();
}