import {BaseView} from './BaseView';
import {RegAuthModel} from "../models/RegAuthModel";
import {AuthorizationContent} from "../components/AuthorizationContent/AuthorizationContent";
import {LandingHeader} from "../components/LandingHeader/LandingHeader";
import {router} from "../main";

export class AuthorizationView extends BaseView {
    model
    divFormView
    listenerAuthorization

    constructor(app) {
        super(app);
    }

    renderBase = () => {
        document.body.classList.add('landing-body-background');
        this._app.innerHTML = '';
        this._app.classList.add('registration-body-background');

        const header = new LandingHeader(this._app).render();

        const div = document.createElement('div');
        div.classList.add('formView');
        this._app.appendChild(div);

        const divFormView = document.createElement('div');
        divFormView.classList.add('inner-formView');
        div.appendChild(divFormView);

        const footer = document.createElement('footer');
        footer.classList.add('landing-footer');
        this._app.appendChild(footer);

        divFormView.addEventListener('click', (evt) => {
            evt.stopPropagation();
        });
        this._app.addEventListener('click', this.#renderBackPopup.bind(this));

        return divFormView;
    }

    render() {
        this.divFormView = this.renderBase();

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this.divFormView.appendChild(Form);

        (new AuthorizationContent(form)).render();

        const button = document.getElementById('next');
        button.addEventListener('click', this.listenerAuthorization);

        const cancel = document.getElementsByClassName('cancelButton')[0];
        cancel.addEventListener('click', this.#renderBackPopup.bind(this));
    }

    #renderBackPopup(evt) {
        evt.preventDefault();
        router.redirect('/');
        this._app.removeEventListener('click', this.#renderBackPopup.bind(this));
    }
}