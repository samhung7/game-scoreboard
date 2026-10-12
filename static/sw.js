// Offline cache so the boards still work in a gym with bad signal.
const CACHE = "scoreboard-v10";
const ASSETS = ["./", "index.html", "badminton.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png", "sounds/manifest.json", "css/base.css", "css/basketball.css", "css/badminton.css", "js/config.js", "js/spotify.js", "js/kit.js", "js/basketball.js", "js/badminton.js"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))); self.clients.claim(); });
// network first, so a new version shows up as soon as there is signal; cache when offline
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(e.request).then((res) => {
    const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {}); return res;
  }).catch(() => caches.match(e.request)));
});
