const noop = () => {}

class Ajax {
    ajaxGet = async (url, body = {}) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=utf8',
            },
            body: JSON.stringify(body),
        });

        const responseObjectJson = await response.json();

        return {
            status: response.statusCode,
            responseObject: responseObjectJson,
        };
    }

    ajaxPost = async (url, body = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=utf8',
            },
            body: JSON.stringify(body),
        });

        const responseObjectJson = await response.json();

        return {
            status: response.statusCode,
            responseObject: responseObjectJson,
        };
    }
}

const ajax = new Ajax();
export default ajax;