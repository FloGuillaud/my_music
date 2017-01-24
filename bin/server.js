var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");

var port = 8081;

app.use('/', express.static(path.resolve(__dirname, '..', 'public')));
app.use((req, res) => { res.status(200).sendFile(path.resolve(__dirname, '..', 'index.html')); });
var server = app.listen(8081, function () {
  console.log("App listening at http://%s:%s", "127.0.0.1", port);
})
