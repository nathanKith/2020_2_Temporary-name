import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';
import {router} from '../main';

export class LandingController {
    #view

    constructor(view) {
        this.#view = view;
    }

    async control() {
        // this.#tryRedirect();
        this.#view.render();
    }

    async #tryRedirect() {
        // await ajax.get(backend.me)
        // .then(({status, responseObject}) => {
        //     if (status === 200) {
        //         router.redirect('/feed');
        //     } else {
        //         this.#view.render();
        //     }
        // })
        // .catch((err) => {
        //     console.log(err.message);
        // });
    }
}