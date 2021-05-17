// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests

var myCache = 'my-site-cache-v1';
var urlsToCache = [
    "https://cse110lab6.herkuapp.com/entries"
];

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(myCache).then(function(cache){
            console.log('Open cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response){
                return response;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
})