
'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('client connected');
    console.log(socket.id);
    socket.on('disconnect', () => console.log('client disconnected'));
});

setInterval(() => io.emit("time", new Date().toTimeString()), 1000);


