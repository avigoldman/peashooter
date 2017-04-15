'use strict';
 
const knexfile = require('../knexfile')
    , knex = require('knex')(knexfile[process.env.NODE_ENV || 'development']);

module.exports = knex;