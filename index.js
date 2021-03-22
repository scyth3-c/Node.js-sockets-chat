//requerimientos > >
const express = require('express');
const color = require('colors');
const path = require('path');
const socketio = require('socket.io');
const { Socket } = require('dgram');
var nuser = 0;
//iniciador y msg > >
const ctl = express();
console.log(color.cyan("iniciando todo"));

//servidor > > 
ctl.use(express.static(path.join(__dirname, 'public')));

ctl.set('port', process.env.PORT || 3000);
const server_conf = ctl.listen(ctl.get('port'), () => {
 console.log(color.green("puerto: %s"), ctl.get('port'));
});


//socket > >
const io = socketio(server_conf);
io.on('connection', (socket) => {
    console.log(color.green("Nuevo Usuario Conectado"));
    nuser = io.engine.clientsCount;
    io.sockets.emit('users', nuser);
  

    socket.on('chat:mensaje', (data) => {
       io.sockets.emit('respuesta',data);
    })
});






