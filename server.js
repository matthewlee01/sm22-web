
'use strict';

// require statements to load libraries
const express = require('express');
const socketIO = require('socket.io');

// port determined by process environment, default to 3000
const PORT = process.env.PORT || 3000;

// webpage filename
const INDEX = '/index.html';

// initializes express server to serve webpage to clients
const server = express()
    .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
    .listen(PORT, () => console.log(`listening on ${PORT}`));

// initializes websocket
const io = socketIO(server);
var BIKE_CLIENT_ID = "";

// handlers for socket events
io.on('connection', (socket) => {
  console.log(`client connected: ${socket.id}`);
    
  socket.on('bike-connect', () => {
    io.emit('bike-connect');
    BIKE_CLIENT_ID = socket.id;
  });

  socket.on('update-data', (values) => {
    io.emit('update-data', values);
  });
  socket.on('disconnect', () => {
    if (socket.id = BIKE_CLIENT_ID) {
      io.emit('bike-disconnect');
    }
    console.log('client disconnected')
  });
});



