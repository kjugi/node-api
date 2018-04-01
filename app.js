const express        = require('express'),
      app            = express(),
      db             = require('./db'),
      userController = require('./user/userController');

app.use('/users', userController);

module.exports = app;
