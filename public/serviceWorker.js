let CACHE_NAME = "cache-v5";
const urlsToCache = [
"/",
"/index.html",
];
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName) {
              if(cacheName != CACHE_NAME){
                return true
              }
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
  if ('serviceWorker' in navigator) {
    caches.keys().then(function(cacheNames) {
      cacheNames.forEach(function(cacheName) {
        caches.delete(cacheName);
      });
    });
  }
self.addEventListener("install", function(event) {
// Perform install steps
    event.waitUntil(
            caches.open(CACHE_NAME)
            .then(function(cache) {
            console.log("Opened cache " + CACHE_NAME);
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});
self.addEventListener("fetch", function(event) {
    event.respondWith(caches.match(event.request)
    .then(function(response) {
        if (response) {
            return response;
        }
        return fetch(event.request);
    })
);
});
