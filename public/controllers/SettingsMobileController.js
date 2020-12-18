import {ajax} from '../modules/ajax';
import {backend} from '../modules/url';
import {router} from '../main';
import {tryRedirect} from '../modules/tryRedirect';

export class SettingsMobileController {
    #view
    #profile

    constructor(view, userModel) {
        this.#view = view;
        this.#profile = userModel;
    }

    #makeContext() {
        return {
            settings: {
                settings: {
                    id: this.#profile.id,
                    telephone: this.#profile.telephone,
                    name: this.#profile.name,
                    job: this.#profile.job,
                    education: this.#profile.education,
                    aboutMe: this.#profile.aboutMe,
                    linkImages: this.#profile.linkImages,
                    age: this.#profile.age,
                },
                event: {
                    logout: {
                        type: 'click',
                        listener: this.logoutListener.bind(this),
                    },
                    save: {
                        type: 'click',
                        listener: this.editUserListener.bind(this),
                    }
                },
                validate: {
                    passwords: {
                        message: '',
                    }
                }
            }
        };
    }

    async logoutListener(evt) {
        evt.preventDefault();
        await ajax.post(backend.logout, {})
            .then(({status, responseObject}) => {
                if (status === 500 || status === 401) {
                    throw new Error(`${status} logout error`);
                }
                router.redirect('/');
            })
            .catch((err) => {
                console.log(err.message);
                router.redirect('/');
            });
    }

    async editUserListener(evt) {
        evt.preventDefault();
        const data = this.#view.getSettingsData();

        await ajax.post(backend.settings, data)
            .then(async ({status, responseObject}) => {
                if (status === 400) {
                    throw new Error(`${status} settings error: bad request to server on /settings`);
                }
                if (status === 401) {
                    throw new Error(`${status} unauthorized: cannot post json on /settings`);
                }

                const saveButton = document.getElementById('save-button');
                saveButton.classList.add('pink-save');

                await this.#profile.update();
                this.#view.context = this.#makeContext();
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    async update() {
        await this.#profile.update();
    }

    async control() {
        const isAuth = await tryRedirect();
        if (!isAuth) {
            router.redirect('/');
            return;
        }

        await this.update();
        this.#view.context = this.#makeContext();
        this.#view.render();
    }

}