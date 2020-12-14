import FeedEndTemplate from './FeedEnd.hbs';
import './FeedEnd.css';

export class FeedEnd {
    #parent

    constructor(parent) {
        this.#parent = parent;
    }

    render() {
        this.#parent.insertAdjacentHTML('afterbegin', FeedEndTemplate());
    }
}
