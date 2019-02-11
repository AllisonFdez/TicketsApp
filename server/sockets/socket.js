const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('Usuario conectado.');

    client.emit('Saludo', {
        mensaje: 'Bienvenido.'
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'Número de escritorio es necesario.'
            })
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //Actualizar por cambios en los últimos 4.
        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatro()
        })

    })

    client.on('disconnect', () => {
        console.log('Usuario desconectado.');
    });

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });

});