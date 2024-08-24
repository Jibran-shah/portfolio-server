self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon,
    image: data.image,
    badge: data.badge,
    data: data.data,
    actions: data.actions,
    vibrate: data.vibrate,
    sound: data.sound,
    timestamp: data.timestamp
  };
    self.registration.showNotification(data.title, options);
  });
  