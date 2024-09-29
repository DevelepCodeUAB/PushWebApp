

// Subscribing to push Notifications
const subscribe = () => {
    const token = document.getElementById('token');
    // getting PushNotification permission from browser
    Notification.requestPermission().then(permission => {



    }).catch(e=>{
        token.textContent=e;
    });
};



// Sending Push Notifications
const sendPush = async () => {
    // Obtener los datos del formulario cuando se hace clic en el botón
    const token = document.getElementById('usertoken').value;
    const notificationTitle = document.getElementById('title').value;
    const notificationBody = document.getElementById('body').value;

    // Crear el payload con los datos para enviar al servidor
    let data = {
        token: token,
        title: notificationTitle,
        body: notificationBody
    };

    // Configurar las opciones para el envío al servidor remoto
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data) // Convertir los datos a formato JSON
    };

    try {
        // Enviar los datos al servidor remoto
        const response = await fetch("https://haciendas.online/pushnot.php", options);
        const result = await response.json();

        if (result.success) {
            console.log("Notificación enviada con éxito");
        } else {
            console.log("Error al enviar la notificación");
        }
    } catch (err) {
        console.log("Error al enviar la solicitud: " + err);
    }
};