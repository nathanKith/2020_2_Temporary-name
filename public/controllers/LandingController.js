import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';
import {router} from '../main';

export class LandingController {
    #view

    constructor(view) {
        this.#view = view;
    }

    async control() {
        await this.#tryRedirect()
            .then(({status, responseObject}) => {
                if (status === 200) {
                    router.redirect('/feed');
                } else {
                    this.#view.render();
                }
            })
            .catch((err) => {
                console.log('unathorized');
            });
    }

    async #tryRedirect() {
        return await ajax.get(backend.me);
    }
}