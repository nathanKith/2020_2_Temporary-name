export class LandingController {
    #view

    constructor(view) {
        this.#view = view;
    }

    async control() {
        await this.#view.render();
    }
}