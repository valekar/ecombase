

var express = require('express'),
  config = require('./server/config/config'),
  db = require('./server/app/models');

var app = express();

require('./server/config/express')(app, config);

db.sequelize
  .sync()
  .then(function () {
    app.listen(config.port);
  }).catch(function (e) {
    throw new Error(e);
  });

