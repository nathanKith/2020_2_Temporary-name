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
        this.#routes.forEach((route) => {
            this.#convertToRegExp(route);
        }, this);

        const route = this.#routes.find((route) => {
            return this.#getCurrentPath().match(route.regExp);
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
            parameters: this.#handleParameters(url),
            regExp: null,
        });

        return this;
    }

    redirect = (url, data = {}, title = '') => {
        window.history.pushState(data, title, url);
        return this.start();
    }

    #convertToRegExp(route) {
        let regExp = route.url.replace(/\//g, '\\/')
                                .replace(/\./g, '\\.')
                                .replace('/', '/?');

        if (this.#hasParameters(route.url)) {
            regExp.replace(/{\w+}/g, (parameter) => {
                const parameterName = parameter.replace('{', '')
                                               .replace('}', '');
                route.parameters.some((param) => {
                    if (param[parameterName] !== undefined) {
                        regExp = regExp.replace(parameter, param[parameterName].regExp);
                        return regExp;
                    }
                });

                return parameter;
            });
        }

        route.regExp = new RegExp(`^${regExp}$`);
        return route;
    }

    #handleParameters(url) {
        let parameters = [];
        let sn = 0;

        if (this.#hasParameters(url)) {
            url.replace(/\{\w+\}/g, (parameter) => {
                sn++;
                parameter.replace(/\w+/, (parameterName) => {
                    let obj = {};
                    obj[parameterName] = {
                        sn: sn,
                        regExp: '([^\\/]+)',
                        value: null,
                    }
                    parameters.push(obj);
                });
            });
        }

        return parameters;
    }

    #hasParameters(url) {
        return url.search(/{\w+}/g) >= 0;
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