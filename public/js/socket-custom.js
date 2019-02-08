var socket = io();
socket.on('connect', function() {
    console.log('Conectado al servidor.');
});
socket.on('disconnect', function() {
    console.log('Conexión perdida con el servidor.');
});

socket.emit('enviarMensaje', {
    usuario: 'Sistraa',
    mensaje: 'Grupo Tecnoglass'
}, function(resp) {
    /* resp es una respuesta del servidor */
    /* Este 3er argumento del Emit se dispara cuando  todo Ok.*/
    console.log('Se disparó el Callback', resp);
});

socket.on('Saludo', function(mensaje) {
    console.log('Servidor dice:', mensaje);
})