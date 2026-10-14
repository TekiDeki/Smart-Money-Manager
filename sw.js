// sw.js — Smart Money Manager
const CACHE_NAME = 'smm-v3';
const ASSETS = [
  './',
  './index.html',
  './LICENSE',
  './manifest.json',
  "./favicon.ico",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener('install', (e) => {
  console.log('SW installed');
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  console.log('SW activated');
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('smm-v') && k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const licenseUrl = new URL('./LICENSE', self.registration.scope).href;
  if (e.request.method === 'GET' && e.request.url === licenseUrl) {
    e.respondWith(caches.open(CACHE_NAME).then(cache => cache.match(e.request)).then(cached => cached || fetch(e.request)));
    return;
  }
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const network = fetch(e.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
