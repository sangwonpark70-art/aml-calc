const CACHE_NAME = 'aml-calc-v84-20260630';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json'
];

// 설치: 캐시 저장
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

// 활성화: 구버전 캐시 삭제
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// 요청: 캐시 우선, 없으면 네트워크
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response =>
            response || fetch(event.request)
        )
    );
});
