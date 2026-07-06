self.addEventListener('install', function (e) { self.skipWaiting() })
self.addEventListener('activate', function (e) { e.waitUntil(clients.claim()) })
self.addEventListener('fetch', function (e) {
  e.respondWith(fetch(e.request).catch(function () { return caches.match(e.request) }))
})
self.addEventListener('push', function (e) {
  var data = {}
  try { data = e.data ? e.data.json() : {} } catch (err) {}
  e.waitUntil(self.registration.showNotification(data.title || 'Lucian 🌙', {
    body: data.body || 'Thinking of you.',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  }))
})
self.addEventListener('notificationclick', function (e) {
  e.notification.close()
  e.waitUntil(clients.openWindow('/'))
})
