import { SSL_OP_NO_TICKET } from "constants";

var socket = io();

//Buscar con jqury según el id en el html.

var labelTicket1 = $('#label-Ticket1')
var labelTicket2 = $('#label-Ticket2')
var labelTicket3 = $('#label-Ticket3')
var labelTicket4 = $('#label-Ticket4')

var labelEscritorio1 = $('#label-Escritorio1')
var labelEscritorio2 = $('#label-Escritorio2')
var labelEscritorio3 = $('#label-Escritorio3')
var labelEscritorio4 = $('#label-Escritorio4')

var labelTickets = [labelTicket1, labelTicket2, labelTicket3, labelTicket4]
var labelEscritorios = [labelEscritorio1, labelEscritorio2, labelEscritorio3, labelEscritorio4]

socket.on('estadoActual', function(data) {
    console.log(data);
    actualizarHTML(data.ultimosCuatro);
});

socket.on('ultimosCuatro', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(data.ultimosCuatro);
});

function actualizarHTML(ultimosCuatros) {
    for (var i = 0; i <= ultimosCuatros.length - 1; i++) {
        labelTickets[i].text('Ticket ' + ultimosCuatros[i].numero);
        labelEscritorios[i].text('Escritorio ' + ultimosCuatros[i].escritorio);
    }
}