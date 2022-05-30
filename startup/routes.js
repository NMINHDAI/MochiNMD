const express = require('express');
const error = require('../middleware/error');
const screenRoute = require('../routes/screen');
module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  
  app.use('/', screenRoute);
  app.use(error);
}