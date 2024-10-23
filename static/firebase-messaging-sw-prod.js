importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.0.0/firebase-messaging.js');
firebase.initializeApp({
  messagingSenderId: '253819861912'
});
const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
  let url = event.notification.tag;
  event.notification.close();
  event.waitUntil(
      clients.matchAll({type: 'window'}).then( windowClients => {
          for (let i = 0; i < windowClients.length; i++) {
              const client = windowClients[i];
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
  );
});

messaging.setBackgroundMessageHandler(payload => {
  return self.registration.showNotification(
    payload.data.title,
    {
      body: payload.data.body,
      icon: '/static/images/logo-big.png'
    }
  );
});
