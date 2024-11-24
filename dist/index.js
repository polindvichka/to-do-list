"use strict";

var express = require('express');
require('dotenv').config();
// import routes
var todoRoutes = require('./routes/todo');

// Running express server
var app = express();
var port = process.env.PORT || 8000;

// route middlewares
app.use('/api', todoRoutes);
app.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log("App listening at http://localhost:".concat(port));
});
