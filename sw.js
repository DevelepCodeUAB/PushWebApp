self.addEventListener('install', event => {
    console.log('Service Worker instalado.');
    self.skipWaiting(); 
});

self.addEventListener('activate', event => {
    console.log('Service Worker activado.');
    return self.clients.claim(); 
});

self.addEventListener('push', function(event) {
    console.log('Evento push recibido:', event);

    let data = {};
    if (event.data) {
        try {
            data = event.data.json();
            console.log('Datos de la notificación:', data);
        } catch (e) {
            console.error('Error al procesar los datos de la notificación:', e);
            return;
        }
    } else {
        console.log('Evento push recibido sin datos.');
        return;
    }

    const notificationTitle = data.notification?.title || 'Notificación sin título';
    const notificationOptions = {
        body: data.notification?.body || 'Cuerpo de la notificación no proporcionado.',
        icon: data.notification?.icon || '/templates/icon.png',
        badge: data.notification?.badge || '/templates/icon.png',
        data: { url: data.notification?.click_action || '/' }
    };

    event.waitUntil(
        self.registration.showNotification(notificationTitle, notificationOptions)
            .then(() => console.log('Notificación mostrada con éxito'))
            .catch(error => console.error('Error al mostrar la notificación:', error))
    );

   
    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clients => {
            if (clients && clients.length) {
                clients.forEach(client => {
                    console.log('Enviando mensaje a la página:', client);
                    client.postMessage({ action: 'executeFunction', data: data });
                });
            } else {
                console.warn('No se encontraron ventanas controladas para enviar el mensaje.');
            }
        }).catch(error => console.error('Error al enviar mensaje a la página:', error))
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notificación clickeada:', event.notification.data);
    event.notification.close();
    event.waitUntil(
        clients.openWindow(event.notification.data.url)
            .then(() => console.log('Ventana abierta con éxito'))
            .catch(error => console.error('Error al abrir la ventana:', error))
    );
});