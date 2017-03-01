'use strict';

const Q = require('q');

const harvest = require('./harvest/harvest.js');
const mongo = require('./database/database.js');

const startMongo = function () {
  return mongo.start();
};

Q.fcall(startMongo).done(function () {
  harvest.poll()
  .done(function (totals) {
    mongo.write({ document: totals, collection: 'time'});
  });
});
