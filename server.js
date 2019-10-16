require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


app.use('/segurity/user', require('./seguridad/usuario.controller'));


var port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});