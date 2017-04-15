'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(PORT, function () {
  console.log(`Peashooter listening on port ${PORT}!`);
});