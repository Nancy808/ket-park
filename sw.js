/* 英语萌宠乐园 Service Worker
   改动 VER 版本号 → 平板自动更新

   策略（v1.8 改）：
   - 页面 / JS / 数据  → 网络优先（network-first），改完立刻生效；断网回落缓存
   - 音频              → 缓存优先，首次取回后离线可用（80MB，不能每次走网络）
   - Range 请求        → 直接走网络（音频 seek） */
const VER = 'ket-park-v1.11.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './data/words.js',
  './data/emoji.js',
  './data/readers.js',
  './data/readers_easy.js',
  './data/readers_more.js',
  './data/exam.js',
  './audio/words/index.json',
  './audio/words/maisie/index.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(VER).then(c => c.addAll(ASSETS).catch(() => {})));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  /* 音频 Range 请求（seek）直接走网络，避免缓存 206 出问题 */
  if (req.headers.has('range')) { e.respondWith(fetch(req)); return; }

  /* 音频文件：缓存优先，首次联网取回后写入缓存，之后离线可用 */
  if (url.pathname.indexOf('/audio/') >= 0) {
    e.respondWith(
      caches.match(req).then(hit => {
        if (hit) return hit;
        return fetch(req).then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(VER).then(c => c.put(req, copy).catch(() => {}));
          }
          return res;
        });
      })
    );
    return;
  }

  /* 页面 / JS / 数据：网络优先。
     之前是缓存优先，导致改完代码平板上还是旧版本 —— 已修。
     断网时自动回落缓存，离线照样能用。 */
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(VER).then(c => c.put(req, copy).catch(() => {}));
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
  );
});
