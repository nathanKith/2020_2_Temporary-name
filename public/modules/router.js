export class Router {
    #routes
    #currentPath

    constructor() {
        this.#routes = [];
        this.#currentPath = this.#getCurrentPath();

        this.#handleHistoryMode();

        return this;
    }

    start = () => {
        const route = this.#routes.find((route) => {
            return this.#getCurrentPath() === route.url;
        }, this);

        if (route === undefined) {
            return this.#routes.find((router) => {
                return router.url === '/';
            }, this).callback.call(this);
        }

        return route.callback.call(this);
    }

    add = (url, callback) => {
        url = url.toLowerCase();
        if (!url.startsWith('/')) {
            throw new Error(`router error: invalid path ${url}; every path should start with /.`);
        }

        this.#routes.forEach((route) => {
            if (url === route.url) {
                throw new Error(`router error: route ${url} already exists.`);
            }
        });

        this.#routes.push({
            url: url,
            callback: callback,
        });

        return this;
    }

    redirect = (url, data = {}, title = '') => {
        window.history.pushState(data, title, url);
        return this.start();
    }

    #getCurrentPath = () => {
        return window.location.pathname;
    }

    #handleHistoryMode = () => {
        if (!window.PopStateEvent && !('pushState' in history)) {
            return;
        }

        window.addEventListener('click', (evt) => {
            if (evt.target instanceof HTMLAnchorElement) {
                evt.preventDefault();
                this.redirect(evt.target.pathname);
            }
        });

        window.addEventListener('popstate', () => {
            console.log('')
            this.start();
        });

        return this;
    }
}