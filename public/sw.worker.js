'use strict'

const cacheName = 'mi-ami-v1';
const api = 'api/v1';

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
    // api + '/feed',

    '/bundle.js',
    '/index.html',

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
        return new Response(blobResponse, {
            status: this._response ? this._response.status : status,
            statusText: this._response ? this._response.statusText : 'ok',
            headers: headersResponse
        });
    }
}

class PlainRequestManager{
    constructor(){}

    async _handleRequest(request){
        const response = await fetch(request);
        if(response && response.ok){
            const fakeResponse = await (new FakeResponse(response.clone())).get({'Csrf':null});
            let cache = await caches.open(cacheName);
            await cache.put(request, fakeResponse);
        }
        return response;
    }

    async _offlineRequestHandler(request){
        let cache = await caches.open(cacheName);
        const match = await cache.match(request);
        return await (new FakeResponse(match)).get({},
            {'errors':[{'code':200,'message':'offline'}]});
    }

    async fetch(request){
        if(navigator.onLine){
            return await this._handleRequest(request);
        } else {
            return await this._offlineRequestHandler(request);
        }
    }
}

class ComplicatedRequestManager{
    constructor(){}

    async fetch(request){
        if(navigator.onLine){
            return await fetch(request);
        } else {
            return await (new FakeResponse(null)).get({},
                {'errors':[{'code':400,'message':'offline'}]});
        }
    }
}

const plainRequestManager = new PlainRequestManager();
const complicatedRequestManager = new ComplicatedRequestManager();
console.log(self);

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
    console.log(evt.request.url);
    // const cache = await caches.open(cacheName);
    if(evt.request.method === 'GET') {
        evt.respondWith(
            plainRequestManager.fetch(evt.request)
            // caches.match(evt.request).then( (response) => {
            //     return plainRequestManager.fetch(evt.request);
            // }).catch( async () => {
            //     await complicatedRequestManager.fetch(evt.request);
                // if (navigator.onLine) {
                //     return await fetch(evt.request);
                // } else {
                //     return await (new FakeResponse(null)).get({},
                //         {'errors':[{'code':200,'message':'offline'}]});
                // }
            

        );
    } else {
        console.log('Post');
        console.log(evt.request.url);
        evt.respondWith(
            complicatedRequestManager.fetch(evt.request)
        );
    }
});