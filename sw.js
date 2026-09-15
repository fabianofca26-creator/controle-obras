// Página vem pela rede primeiro (versão nova chega na hora) e cai pro cache
// quando não há sinal. O resto é cache-first. Igual ao padrão do app de assistência.
const CACHE = "obra-v1";
const ARQ = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQ)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const guardar = (req, res) => {
  if (res && res.ok) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
  return res;
};

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  const pagina = e.request.mode === "navigate" || e.request.destination === "document";
  e.respondWith(
    pagina
      ? fetch(e.request.url, { cache: "no-store" }).then(res => guardar(e.request, res))
          .catch(() => caches.match(e.request).then(hit => hit || caches.match("./index.html")))
      : caches.match(e.request).then(hit => hit || fetch(e.request).then(res => guardar(e.request, res)))
  );
});
