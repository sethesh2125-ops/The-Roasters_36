const cacheName = "ai-tutor-cache-v1";
const assets = ["index.html", "main.js", "lesson1.mp3"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(assets)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
