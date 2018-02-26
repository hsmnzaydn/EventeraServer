'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var db= require('./api/mocks/db')
var readCsv= require('./api/helpers/ReadCsvFile')
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
 readCsv.readCsv();
  var port = process.env.PORT || 8080;
  app.listen(port);

  
});
