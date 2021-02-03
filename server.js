
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
    console.log(`client connected: ${socket.id}`);
    socket.on('update-data', (speed, temp, rpm) => {
      io.emit('update-data', speed, temp, rpm);
    socket.on('disconnect', () => console.log('client disconnected'));
});

setInterval(() => io.emit("time", new Date().toTimeString()), 1000);


