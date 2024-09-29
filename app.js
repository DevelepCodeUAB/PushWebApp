
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-messaging.js";
// Firebase Configurations
const firebaseConfig = {

};



function register(){

    navigator.serviceWorker.register('/static/sw.js')
        .then(registration => {
            console.log('Service Worker registrado correctamente:', registration);

            return getToken(messaging, { 
                serviceWorkerRegistration: registration,
                vapidKey: 'BDIhGTrWCFU-tUiVUBI6MEwTpppS9bvo2FegjdFw16WFya-AZlAtMPEOl5ix1ze4t__oS37qhiA7Ut4XmyfF8To' 
            });
        })
        .then((currentToken) => {
            if (currentToken) {
                console.log("Token actual:", currentToken);
                token.textContent = currentToken;
            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token.', err);
            
        })
        .then(() => {
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification('Notificación de Prueba Manual', {
                    body: 'Esta es una notificación de prueba.',
                    icon: '/templates/icon.png'
                });
            });
        })
        .catch(error => {
            console.error('Error al registrar el Service Worker:', error);
        });

}



const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
window.register = register;