var static_files = []; //static files will emit upon bundling, put this at index line 0 is important!

var cache_name = 'static';

self.addEventListener('install', function (e) {
  e.waitUntil(
    self.caches.open(cache_name).then(function (cache) {
      cache.addAll(static_files);
    })
  );

  console.log('Service Woker has been installed.', e);
});

self.addEventListener('activate', function (e) {
  console.log('Service Woker activated.', e);
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    self.caches.match(e.request).then(function (cacheRes) {
      return cacheRes || fetch(e.request);
    })
  );
});
