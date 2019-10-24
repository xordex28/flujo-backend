require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('_helpers/jwt');
var errorHandler = require('_helpers/error-handler');

// console.log(bodyParser);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
// api routes
app.use('/segurity/user', require('./seguridad/usuario.controller'));
app.use(errorHandler);

var port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});