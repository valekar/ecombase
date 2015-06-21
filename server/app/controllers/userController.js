var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
module.exports = function (app) {
    app.use('/api', router);
};
