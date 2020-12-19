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

class GetRequestManager {
    constructor(){}

    async _handleRequest(request){
        const response = await fetch(request);
        if(response && response.ok){
            console.log('я записываю в кеш');
            let cache = await caches.open(cacheName);
            await cache.put(request, response.clone());
        }

        return response;
    }

    async _offlineRequestHandler(request){
        let cache = await caches.open(cacheName);
        const match = await cache.match(request);
        
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
