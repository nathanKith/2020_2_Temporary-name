export class ProfileMobileController {
    #view
    #profile

    constructor(view, userModel) {
        this.#view = view;
        this.#profile = userModel;
    }

    async update() {
        await this.#profile.update();
    }

    #makeContext() {
        return {
            profile: {
                id:         this.#profile.id,
                name:       this.#profile.name,
                job:        this.#profile.job,
                education:  this.#profile.education,
                aboutMe:    this.#profile.aboutMe,
                linkImages: this.#profile.linkImages,
                age:        this.#profile.age,
            },
        };
    }

    async control() {
        await this.update();
        this.#view.context = this.#makeContext();
        this.#view.render();
    }
}
