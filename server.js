'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const escapeHtml = require('escape-html');
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

/**
 * Logs a new line
 */
app.post('/log', function(req, res) {
  knex('entries')
  .insert({
    text: escapeHtml(req.body),
    created_at: knex.fn.now()
  })
  .then((entries) => {
    return knex('entries').whereIn('id', entries);
  })
  .then((entries) => {
    const entry = entries[0];
    io.emit('entry', entry);
    res.status(200).send(entry);
  })
  .catch((err) => {
    sendError(res, err);
  });
});