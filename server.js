/**
 * Created by Aidan on 14/07/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var viewDir = 'app';

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, viewDir)));

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});