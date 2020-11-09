class Ajax {
    #ajax = (url, method, data, photo = false) => {
        const request = {
            method: method,
            mode: 'cors',
            credentials: 'include',
        };

        const csrf = sessionStorage.getItem('csrf');
        if (csrf) {
            request['headers'] = {'X-CSRF-TOKEN': csrf};
        }

        if (method !== 'GET') {
            request['body'] = photo ? data : JSON.stringify(data);
        }

        return new Request(url, request);
    }

    get = async (url) => {
        const response = await fetch(this.#ajax(url, 'GET', null));
        const csrf = response.headers.get('Csrf');
        if (csrf) {
            sessionStorage.setItem('csrf', csrf);
        }

        const responseObject = await response.json();

        return {
            status: response.status,
            responseObject: responseObject,
        };
    }

    post = async (url, body, photo = false) => {
        const response = await fetch(this.#ajax(url, 'POST', body, photo));
        const csrf = response.headers.get('Csrf');
        if (csrf) {
            sessionStorage.setItem('csrf', csrf);
        }

        const responseObject = await response.json();

        return {
            status: response.status,
            responseObject: responseObject,
        };
    }

    ajaxPostPhoto = async (url, body = {}, name) => {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            body: body,
        });

        const responseObjectJson = await response.json();

        return {
            status: response.status,
            responseObject: responseObjectJson,
        };
    }
}

export const ajax = new Ajax();