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

        const settings = new Settings(container);
        settings.data = this._context['settings'];
        settings.render();

        const navigationHeader = new FeedHeaderMobile(container);
        navigationHeader.render();

        const settingsDiv = document.getElementsByClassName('settings-open')[0];
        settingsDiv.removeChild(document.getElementsByClassName('inner-settings')[0]);
        settingsDiv.removeChild(document.getElementsByClassName('settings-header')[0]);
    }

    getSettingsData() {
        return {
            name: document.getElementById('settings-name').value,
            education: document.getElementById('education').value,
            job: document.getElementById('job').value,
            aboutMe: document.getElementById('aboutMe').value,
        };
    }

    rerenderSettings() {
        const err = document.getElementById('error');
        err.innerText = this._context['settings'].validate.passwords.message;
    }
}