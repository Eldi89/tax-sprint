// Tax Sprint service worker: the app keeps working without a signal (subway, elevator).
const VERSION = '1.1.0';
const CACHE = 'taxsprint-' + VERSION;
const CORE = ['/', '/index.html', '/manifest.json', '/icon-180.png', '/icon-192.png', '/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('taxsprint-') && k !== CACHE && k !== 'taxsprint-runtime').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // the app page: network first so updates arrive, cached copy when offline
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put('/index.html', cp)); } return r; }).catch(() => caches.match('/index.html')));
    return;
  }
  // icons, manifest and fonts: cached copy first, refreshed in the background
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open('taxsprint-runtime').then(c => c.put(req, cp)); } return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});
