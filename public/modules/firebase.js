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
    return window.confirmResult.confirm(code);
}

export function logoutFirebase() {
    return firebase.auth().signOut();
}