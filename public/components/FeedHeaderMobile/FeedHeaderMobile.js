import FeedHeaderMobileTemplate from './FeedHeaderMobile.hbs';
import './FeedHeaderMobile.css';

export class FeedHeaderMobile {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.insertAdjacentHTML('afterbegin', FeedHeaderMobileTemplate());
    }
}