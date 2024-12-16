const API_URL = "http://localhost:3000/messages"; // Cambia la URL si tu compañero usa otro puerto o ruta.

// Función para cargar mensajes
async function loadMessages() {
    try {
        const response = await fetch(API_URL);
        const messages = await response.json();
        const messageList = document.getElementById("message-list");
        messageList.innerHTML = ""; // Limpiar mensajes anteriores

        // Mostrar mensajes
        messages.forEach(msg => {
            const messageElement = document.createElement("div");
            messageElement.textContent = `[${msg.user}] ${msg.message}`;
            messageList.appendChild(messageElement);
        });
        messageList.scrollTop = messageList.scrollHeight; // Desplazar al último mensaje
    } catch (error) {
        console.error("Error al cargar mensajes:", error);
    }
}

// Función para enviar un mensaje
async function sendMessage() {
    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;

    if (!username || !message) {
        alert("Por favor, ingresa tu nombre y un mensaje.");
        return;
    }

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: username, message: message }),
        });
        document.getElementById("message").value = ""; // Limpiar el input
        loadMessages(); // Recargar mensajes
    } catch (error) {
        console.error("Error al enviar mensaje:", error);
    }
}

// Cargar mensajes cada 3 segundos (actualización en "tiempo real")
setInterval(loadMessages, 3000);

// Cargar mensajes al iniciar
loadMessages();
