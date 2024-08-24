// public/app.js
const publicVapidKey = 'BD_0FB9pqeJYnAu1KSe5Otw0kurtXYxNNDANIh-w46RvDZC_x_MyPFgAxc-T32xsBueli5ivIk7PmeWu6XOne3c';
// Convert the VAPID key to a Uint8Array (required by the Push API)
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Register the Service Worker, Register Push, and Send Push
async function send() {
  // Register Service Worker
  const register = await navigator.serviceWorker.register('/notify/sw.js', {
    scope: '/notify/'
  });
  // Register Push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });
  // Send Push Notification
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  });
}

document.getElementById('subscribe').addEventListener('click', () => {
  if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
  }
});
