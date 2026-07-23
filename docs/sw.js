// FireRaven service worker — offline app shell, but never a stale app.
//
// v3 was cache-first for everything, which meant a deployed update could sit
// unseen behind an old cached index.html. The app shell is now network-first
// with a cache fallback: online you always get the newest build, offline you
// still get the last one that worked.
const CACHE = 'fireraven-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './raven.png',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function isShell(url) {
  return url.pathname.endsWith('/') ||
         url.pathname.endsWith('/index.html') ||
         url.pathname.endsWith('/manifest.webmanifest');
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never intercept the app's calls to Anthropic.
  if (url.hostname.endsWith('anthropic.com')) return;
  // Only handle our own origin; everything else goes straight to the network.
  if (url.origin !== self.location.origin) return;

  // App shell + navigations: network first, cache only as an offline fallback.
  if (req.mode === 'navigate' || isShell(url)) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => { try { c.put(req, copy); } catch (_) {} });
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // Static assets (icons, artwork): cache first — they change name, not content.
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => { try { c.put(req, copy); } catch (_) {} });
      return res;
    }))
  );
});
