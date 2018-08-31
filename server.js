require('dotenv').config();
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var port = process.env.PORT
var apiToken = process.env.API_TOKEN
var clientId = process.env.CLIENT_ID
var clientSecret = process.env.CLIENT_SECRET
var signintSecret = process.env.CLIENT_SIGNING_SECRET
app.listen(port);

console.log('PagChomp is this real life');
