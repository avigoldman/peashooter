'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('entries', function (table) {
      table.increments('id').primary();
      table.string('text');
      table.timestamp('created_at');
    })
  ]);  
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('entries')
  ]);
};
