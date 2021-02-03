
'use strict';

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`listening on ${PORT}`));

const io = socketIO(server);
var BIKE_CLIENT_ID = "";

io.on('connection', (socket) => {
  console.log(`client connected: ${socket.id}`);
    
  socket.on('bike-connect', () => {
    io.emit('bike-connect');
    BIKE_CLIENT_ID = socket.id;
  });

  socket.on('update-data', (speed, temp, rpm) => {
    io.emit('update-data', speed, temp, rpm);
  });
  socket.on('disconnect', () => {
    if (socket.id = BIKE_CLIENT_ID) {
      io.emit('bike-disconnect');
    }
    console.log('client disconnected')
  });
});



