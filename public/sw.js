var static_files = ["index.css","logo.png","main.sw.js","manifest.json","index.html","static/css/index.7f4127316a.css","static/js/index.b91f2.js","static/js/vendor.4f294c2f9f.js.LICENSE.txt","static/js/vendor.0809113efa.js.LICENSE.txt","static/js/vendor.4f294c2f9f.js","static/js/vendor.0809113efa.js"]

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
