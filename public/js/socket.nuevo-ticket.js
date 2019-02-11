//Comando para estbalecer conexión.

var socket = io();
var label = $('#label-NuevoTicket')

socket.on('connect', function() {
    console.log('Conectado.');
});

socket.on('disconnect', function() {
    console.log('Desconectado.');
});

socket.on('estadoActual', function(data) {
    label.text(data.actual)
});

//Establecer un Listenner para el botón de "Generar ticket".
$('button').on('click', function() {
    //console.log('Click here!');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket)
    });
})