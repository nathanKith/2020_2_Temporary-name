import {BaseView} from './BaseView';
import {RegistrationModel} from "../models/RegistrationModel";
import {AuthorizationContent} from "../components/AuthorizationContent/AuthorizationContent";

export class AuthorizationView extends BaseView {
    model
    constructor(app, model = new RegistrationModel()) {
        super(app);
        this.model = model;
    }

    render() {
        this._app.innerHTML = '';

        const Form = document.createElement('form');
        Form.classList.add('form');
        const form = this._app.appendChild(Form);

        (new AuthorizationContent(form)).render();
    }
}