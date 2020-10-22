import {BaseView} from './BaseView';
import {LandingHeader} from '../components/LandingHeader/LandingHeader';
import {LandingContent} from '../components/LandingContent/LandingContent';
import './../styles.css';

export class LandingView extends BaseView {
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render = () => {
        this._app.innerHTML = '';
        document.body.classList.add('landing-body-background');

        const parent = document.createElement('div');
        parent.classList.add('landing-heart-background');
        this._app.appendChild(parent);

        (new LandingHeader(parent)).render();
        (new LandingContent(parent)).render();

        const footer = document.createElement('footer');
        footer.classList.add('landing-footer');
        parent.appendChild(footer);
    }
}