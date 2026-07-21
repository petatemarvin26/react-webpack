var static_files = ["index.js","static/js/vendor.c1559d234d.js","static/js/vendor.32f8e8107b.js","static/js/vendor.dd1919ea18.js","static/js/vendor.97145ff942.js","static/js/vendor.da146f309c.js","static/js/vendor.abe409b985.js","static/js/vendor.8b499f625a.js","static/js/vendor.e39df873cd.js","static/js/vendor.5204601309.js","index.2926b9c2daab05bf9166.hot-update.js","index.2926b9c2daab05bf9166.hot-update.json","index.html"]

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
