import {BaseView} from './BaseView';
import {FeedHeaderMobile} from '../components/FeedHeaderMobile/FeedHeaderMobile';
import {Settings} from '../components/Settings/Settings';

export class SettingsMobileView extends BaseView {
    constructor(app = document.getElementById('application')) {
        super(app);
    }

    render() {
        this._app.innerHTML = '';

        const background = document.createElement('div');
        background.classList.add('feed-background');
        this._app.appendChild(background);

        const container = document.createElement('div');
        container.classList.add('feed-container');
        background.appendChild(container);

        const navigationHeader = new FeedHeaderMobile(container);
        navigationHeader.render();

        const settings = new Settings(container);
        settings.data = this._context['settings'];
        settings.render();

        const settingsDiv = document.getElementsByClassName('settings-open')[0];
        settingsDiv.removeChild(document.getElementsByClassName('inner-settings')[0]);
        settingsDiv.removeChild(document.getElementsByClassName('settings-header')[0]);
    }
}