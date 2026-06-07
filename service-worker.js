const CACHE_NAME = "roadrunner-v5";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/background.jpg",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener("activate", event => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(r => r || fetch(event.request)));
});