'use strict'

var path = require('path');
var express = require('express');
var http = require('http');

var livereload = require('livereload');
var connectLivereload = require("connect-livereload");

// const config = require('dotenv').config();

var templatesPath = path.join(__dirname, 'src/main/resources/templates');
var bundlePath = path.join(__dirname, 'src/main/resources/static');
var port = process.env.PORT || 3000;

/*****************************************
 *
 * @type {*|app|app}
 ****************************************/
// var lrserver = livereload.createServer();
// lrserver.watch(bundlePath);


/***************************************
 * @type {app}
 ***************************************/
var app = express();
app.use(express.static(bundlePath));
app.use(express.static(templatesPath));
// app.use(connectLivereload());

/****************************************
* setup node server
****************************************/
var server = http.createServer(app);
server.listen(port, () => {
  console.log("templatesPath: "+ templatesPath);
  console.log("bundlePath: "+ bundlePath);
  console.log("Server is up on port "+ port);
});


// lrserver.server.once("connection", () => {
//     setTimeout(() => {
//     liveReloadServer.refresh("/");
// }, 100);
// });