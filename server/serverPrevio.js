const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO mantiene una conexión directa con el servidor.
// Comunicación del Backend.
let io = socketIO(server)
    // Para saber cuando un usuario se conecta al server.
io.on('connection', (client) => {
    //client contiene toda la información de la máquina que se conectó.
    console.log('Usuario conectado.');
    //Emitir un mensaje cuando un usuario se conecta.
    client.emit('Saludo', {
        mensaje: 'Bienvenido.'
    });
    //Revisar cuando el usuario se desconecta.
    client.on('disconnect', () => {
        console.log('Usuario desconectado.');
    });
    //Escuchar al cliente.
    client.on('enviarMensaje', (mensaje, callback) => {
        console.log(mensaje);
        //Este ejemplo es disparar el callback con un mensaje 
        //según si llega el usuario o no.
        if (mensaje.usuario) {
            callback({
                response: 'Ok.'
            });
        } else {
            callback({
                response: 'Not Ok.'
            });
        }

    });
})

server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});

// Para asegurarse que se configuró bien Socket.
// Debe ser posible ver esta página: http://localhost:3000/socket.io/socket.io.js