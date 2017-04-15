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
app.use(express.static('public'));

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
  const contentType = req.headers['content-type'];
  if (!contentType || contentType.indexOf('text/plain') !== 0) {
    return sendError(res, new Error('Entry must have content-type of "text/plain"'), 400);
  }

  if (typeof req.body !== 'string') {
    return sendError(res, new Error('Entry must be a string.'), 400);
  }

  if (req.body.length === 0) {
    return sendError(res, new Error('Entry must have a length greater than 0.'), 400); 
  }

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

/**
 * Clears all the logs
 */
app.post('/clear', function(req, res) {
  knex('entries')
  .del()
  .then((count) => {  
    io.emit('clear', { count });
    res.status(200).send({ count });
  })
  .catch((err) => {
    sendError(res, err);
  });
});

server.listen(PORT, function () {
  console.log(`Peashooter listening on port ${PORT}!`);
});

function sendError(res, err) {
  const json = {
    error: err.toString()
  };

  io.emit('error', json);
  res.status(500).send(json);
}