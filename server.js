
var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000);

app.use(express.static('public'));

console.log("The server is running");