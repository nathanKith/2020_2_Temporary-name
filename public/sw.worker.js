/* eslint-disable */
'use strict';

const cacheName = 'mi-ami-v1';

const cacheUrls = [
    '/feed',
    '/login',
    '/signup',
    '/mfeed',
    '/mchats',
    '/mprofile',
    '/mcomments/',
    '/msettings',
    '/malbums/',

    // '/bundle.js',
    // '/index.html',

    '/fonts',
    '/fonts/Montserrat-Bold.ttf',
    '/fonts/Montserrat-Light.ttf',
    '/fonts/Montserrat-Medium.ttf',
    '/fonts/Montserrat-SemiBold.ttf',
    '/fonts/Montserrat-Regular.ttf',

    '/img',
    '/img/small_classic_label.png',
    '/img/profile.svg',
    '/img/chats.svg',
    '/img/plus.svg',

];

class FakeResponse {
    constructor(response) {
        this._response = response;
    }

    _copyHeaders(headers = {}) {
        let headersCopy = new Headers(this._response ? this._response.headers : []);
        if(headers instanceof Object){
            for (const [header, value] of Object.entries(headers)) {
                if(value){
                    headersCopy.set(header, value);
                } else {
                    headersCopy.delete(header);
                }
            }
        }
        return headersCopy;
    }

    async _copyBlob(body = {}){
        if(this._response &&
            this._response.headers &&
            this._response.headers.get('content-type') === 'text/plain; charset=utf-8'){
            const jsonBody = Object.assign({}, await this._response.clone().json(), body);
            return new Blob([JSON.stringify(jsonBody)],
                {type : 'text/plain; charset=utf-8'});
        }
        if(this._response){
            return (await this._response.blob());
        } else {
            return new Blob([JSON.stringify(body)],{type : 'text/plain; charset=utf-8'});
        }
    }

    async get(headers = {}, body){
        const blobResponse = await this._copyBlob(body);
        const headersResponse = await this._copyHeaders(headers);
        let status = 200;
        if (body) {
            const errBody = body['errors'][0]['code'];
            if (errBody && errBody === 400) {
                console.log('я в ошибке!');
                status = 400;
            }
        } 
        return new FakeResponse(blobResponse, {
            status: this._response ? this._response.status : status,
            statusText: this._response ? this._response.statusText : 'ok',
            headers: headersResponse
        });
    }
}

class GetRequestManager {
    constructor(){}

    async _handleRequest(request){
        const response = await fetch(request);
        if(response && response.ok){
            console.log('я записываю в кеш');
            let cache = await caches.open(cacheName);
            await cache.put(request, response.clone());
            // const fakeResponse = await (new FakeResponse(response.clone())).get({'Csrf':null});
            // let cache = await caches.open(cacheName);
            // await cache.put(request, fakeResponse);
        }
        return response;
    }

    async _offlineRequestHandler(request){
        let cache = await caches.open(cacheName);
        const match = await cache.match(request);
        // const response =  await (new FakeResponse(match)).get({},
        //     {'errors':[{'code':200,'message':'offline'}]});
        //     console.log(response);
        // return response;
        return match;
    }

    async fetch(request){
        if(navigator.onLine){
            return await this._handleRequest(request);
        } else {
            return await this._offlineRequestHandler(request);
        }
    }
}

class PostRequestManager {
    constructor(){}

    async fetch(request){
        if(navigator.onLine){
            return await fetch(request);
        } else {
            const response = new Response( {result: 'offline'},{ headers: { 'Content-Type': 'apllication/json' }, status: 400});
            response.body = { message: 'offline' };
            // return await (new FakeResponse(null)).get({},
            //     {'errors':[{'code':400,'message':'offline'}]});
            return response;
        }
    }
}

const getRequestManager = new GetRequestManager();
const postRequestManager = new PostRequestManager();


self.addEventListener('install', (evt) => {
    evt.waitUntil(new Promise(resolve => {
        caches.open(cacheName).then((cache)=>{
            resolve(cache.addAll(cacheUrls));
        });
    }));
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', async (evt) => {
    if(evt.request.method === 'GET') {
        evt.respondWith(
            getRequestManager.fetch(evt.request)
        );
    } else {
        console.log('Post');
        console.log(evt.request.url);
        evt.respondWith(
            postRequestManager.fetch(evt.request)
        );
    }
});