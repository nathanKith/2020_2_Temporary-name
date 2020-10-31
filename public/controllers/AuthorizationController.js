import {RegAuthModel} from "../models/RegAuthModel";
import {RegistrationView} from "../views/RegistrationView";

export class AuthorizationController {
    authorizationView
    authorizationModel
    constructor(authorizationView, authorizationModel) {
        this.authorizationModel = authorizationModel;
        this.authorizationView = authorizationView;
        this.authorizationView.model = this.authorizationModel;
    }

    control() {
        this.authorizationView.render();
    }
}