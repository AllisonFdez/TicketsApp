//Comando para estbalecer conexión.

var socket = io();

var searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.has('escritorio'));
//El has es  para que retorne true o false dependiendo de si
//existe el escritorio o no.

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    //Para salir de esta pantalla
    throw new Error('El escritorio es necesario.')
        //Es lo mismo que poner un return pero como no es dentro de una función
        //no hay de qué salir.
}

var escritorio = searchParams.get('escritorio');
var label = $('small')

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp === 'No hay tickets.') {
            label.text('No hay más Tickets.')
            alert(resp);
            return
        }
        label.text('Ticket ' + resp.numero)
    })
})