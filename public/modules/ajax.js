const noop = () => {}

class Ajax {
    ajaxGet = async (url, body = {}) => {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
        });

        const responseObjectJson = await response.json();

        return {
            status: response.status,
            responseObject: responseObjectJson,
        };
    }

    ajaxPost = async (url, body = {}) => {
        const response = await fetch(url, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body),
        });

        const responseObjectJson = await response.json();

        return {
            status: response.status,
            responseObject: responseObjectJson,
        };
    }
}

const ajax = new Ajax();
export default ajax;