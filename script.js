// Función para habilitar o deshabilitar el campo de texto según la selección del dropdown
function toggleInput(inputId) {
    const inputField = document.getElementById(inputId);
    const selectField = document.getElementById(inputId.replace('-input', '-select'));

    if (selectField.value === "Escribir") {
        inputField.disabled = false;
        inputField.focus();
    } else {
        inputField.value = ''; // Limpiar el campo si no se selecciona "Escribir"
        inputField.disabled = true;
    }
}

// Función para manejar la selección de "Diferencia de Llamadas"
function toggleSmartapInputs() {
    const llamadasAInput = document.getElementById("llamadas-a-input");
    const llamadasBInput = document.getElementById("llamadas-b-input");
    const smartapSelect = document.getElementById("smartap-select");

    if (smartapSelect.value === "2") {
        llamadasAInput.disabled = false;
        llamadasBInput.disabled = false;
        llamadasAInput.focus();
    } else {
        llamadasAInput.value = ''; // Limpiar el campo
        llamadasBInput.value = ''; // Limpiar el campo
        llamadasAInput.disabled = true;
        llamadasBInput.disabled = true;
    }
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById("practicante-select").selectedIndex = 0;
    document.getElementById("importante-select").selectedIndex = 0;
    document.getElementById("importante-input").value = '';
    document.getElementById("pendientes-select").selectedIndex = 0;
    document.getElementById("pendientes-input").value = '';
    document.getElementById("creaciones-input").value = '';
    document.getElementById("paz-salvo-input").value = '';
    document.getElementById("reasignaciones-input").value = '';
    document.getElementById("desbloqueos-input").value = '';
    document.getElementById("actividades-input").value = '';
    document.getElementById("service-manager-input").value = '';
    document.getElementById("smartap-select").selectedIndex = 0;
    document.getElementById("llamadas-a-input").value = '';
    document.getElementById("llamadas-b-input").value = '';
    
    // Deshabilitar los campos de texto
    document.getElementById("importante-input").disabled = true;
    document.getElementById("pendientes-input").disabled = true;
    document.getElementById("llamadas-a-input").disabled = true;
    document.getElementById("llamadas-b-input").disabled = true;
}

// Función para enviar el mensaje
function enviarMensaje() {
    const practicante = document.getElementById("practicante-select").value;
    const importante = document.getElementById("importante-select").value;
    const importanteInput = document.getElementById("importante-input").value;
    const pendientes = document.getElementById("pendientes-select").value;
    const pendientesInput = document.getElementById("pendientes-input").value;
    const creaciones = document.getElementById("creaciones-input").value;
    const pazSalvo = document.getElementById("paz-salvo-input").value;
    const reasignaciones = document.getElementById("reasignaciones-input").value;
    const desbloqueos = document.getElementById("desbloqueos-input").value;
    const actividades = document.getElementById("actividades-input").value;
    const serviceManager = document.getElementById("service-manager-input").value;
    const smartap = document.getElementById("smartap-select").value;
    const llamadasA = document.getElementById("llamadas-a-input").value;
    const llamadasB = document.getElementById("llamadas-b-input").value;

    // Validar que todos los campos estén llenos
    if (!practicante || !importante || (importante === "Escribir" && !importanteInput) ||
        !pendientes || (pendientes === "Escribir" && !pendientesInput) ||
        !creaciones || !pazSalvo || !reasignaciones || !desbloqueos || !actividades || !serviceManager ||
        (smartap === "2" && (!llamadasA || !llamadasB))) {
        alert("Por favor, complete todos los campos.");
        return; // Detener la ejecución si no se cumplen las condiciones
    }

    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString('es-CO'); 

    // Construir el mensaje con formato organizado
    let mensaje = `ENTREGA DIARIA PARA APRENDICES\n\n`;
    mensaje += `Practicante: ${practicante}\n\n`;
    mensaje += `IMPORTANTE:\n- ${importante === 'Escribir' ? importanteInput : importante}\n\n`;
    mensaje += `PENDIENTES:\n- ${pendientes === 'Escribir' ? pendientesInput : pendientes}\n\n`;
    mensaje += `Creaciones realizadas: ${creaciones}\n`;
    mensaje += `Paz y salvo realizados: ${pazSalvo}\n`;
    mensaje += `Reasignaciones realizadas: ${reasignaciones}\n`;
    mensaje += `Desbloqueos realizados: ${desbloqueos}\n`;
    mensaje += `Actividades manuales: ${actividades}\n`;
    mensaje += `Service manager pdte: ${serviceManager}\n\n`;

    // Añadir mensaje de SmartAP
    if (smartap === "2") {
        mensaje += `SE REALIZA EL MONITOREO DE SMARTAP DEL DÍA ${fechaActual} SE PRESENTÓ UNA DIFERENCIA DE LLAMADAS DEL LINK A CON ${llamadasA} LLAMADAS Y EN EL LINK B CON ${llamadasB} LLAMADAS.\n`;
    } else {
        mensaje += `SE REALIZA EL MONITOREO DE SMARTAP DEL DÍA ${fechaActual} NO SE PRESENTÓ NINGUNA NOVEDAD.\n`;
    }

    // Enviar el mensaje a Telegram
    const botToken = '7812417782:AAE_koGAy-QrC11udOTies4naL8Yc06qq1U'; // Reemplaza con tu token
    const chatId = '-1002294962984'; // Reemplaza con el ID del grupo

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: mensaje,
            parse_mode: 'Markdown', // Opcional: Para formatear el mensaje
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Mensaje enviado:', data);
        alert('Mensaje enviado al grupo');
        clearForm(); // Llamar a la función para limpiar el formulario
    })
    .catch(error => {
        console.error('Error al enviar el mensaje:', error);
        alert('Error al enviar el mensaje');
    });
}
