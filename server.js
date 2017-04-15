'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const knex = require('./utils/knex');

app.use(bodyParser.text());

server.listen(PORT, function () {
  console.log(`Peashooter listening on port ${PORT}!`);
});

/**
 * Lists all the logs
 */
app.get('/list', function(req, res) {
  knex('entries')
  .select('*')
  .then((entries) => {
    res.status(200).send(entries);
  }).catch((err) => {
    sendError(res, err);
  });
});
