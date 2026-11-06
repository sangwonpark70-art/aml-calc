// 유형판별기 비공개 경로판(PIP 조회) 전용 — 캐시 접두사를 공개판(aml-calc-agent-)과 다르게 둔다(서로 지우지 않게).
const CACHE_PREFIX = 'aml-calc-agentpip-';
const CACHE_NAME = CACHE_PREFIX + '2026110701';
const urlsToCache = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
