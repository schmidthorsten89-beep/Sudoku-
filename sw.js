// Service Worker für die Sudoku-App: macht sie installierbar und offline spielbar.
// VERSION bei jeder Änderung an der App erhöhen (zusammen mit APP_VERSION in index.html).
// Dann wird ein neuer Cache angelegt, der alte gelöscht und die Seite zeigt „Neue Version verfügbar“.
const VERSION = '2';
const CACHE = 'sudoku-v' + VERSION;
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      // cache: 'reload' umgeht den HTTP-Cache des Browsers → wirklich frische Dateien.
      .then(cache => cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('sudoku-') && k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Nur in den eigenen Cache schreiben, solange er existiert. Ein alter Service Worker,
// der noch kurz läuft, legt so keinen bereits gelöschten Cache wieder an.
async function putInCache(key, res) {
  if (await caches.has(CACHE)) await (await caches.open(CACHE)).put(key, res);
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    // Seite: immer zuerst frisch vom Server (am HTTP-Cache vorbei), offline aus dem Cache.
    event.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then(res => {
          if (res.ok) event.waitUntil(putInCache('./index.html', res.clone()));
          return res;
        })
        .catch(() => caches.match('./index.html', { cacheName: CACHE }))
    );
    return;
  }

  // Übrige Dateien (Icons, Manifest): sofort aus dem Cache, im Hintergrund erneuern.
  event.respondWith((async () => {
    const hit = await caches.match(req, { cacheName: CACHE, ignoreSearch: true });
    const update = fetch(req, { cache: 'no-cache' })
      .then(async res => { if (res.ok) await putInCache(req, res.clone()); return res; })
      .catch(() => hit);
    if (hit) { event.waitUntil(update); return hit; }
    return update;
  })());
});
