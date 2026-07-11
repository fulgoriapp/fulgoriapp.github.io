// fulgori Service Worker v1
const CACHE = 'fulgori-v1';
const ASSETS = [
  '/fulgori/',
  '/fulgori/index.html',
  '/fulgori/privacy.html',
  '/fulgori/icon-192.png',
  '/fulgori/icon-512.png',
  '/fulgori/favicon.ico'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() =>
      caches.match('/fulgori/index.html')
    ))
  );
});
