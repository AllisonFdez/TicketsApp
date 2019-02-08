const { io } = require('../server');

io.on('connection', (client) => {
    console.log('Usuario conectado.');
    client.emit('Saludo', {
        mensaje: 'Bienvenido.'
    });
    client.on('disconnect', () => {
        console.log('Usuario desconectado.');
    });
    client.on('Saludo', (data, callback) => {
        console.log(data);
        //Broadcast es para enviar la información a todos los usuarios.
        client.broadcast.emit('Saludo', data);
    });
})