// import * as config from '../config';
const config = require('config.json')
// var mongoose = require('mongoose');
const mongoose = require('mongoose');
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

mongoose.connect(
    process.env.MONGODB_URI || config.connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    // useNewUrlParser: true,
    // useFindAndModify: true,
    // useCreateIndex: true,
});

mongoose.Promise = global.Promise;

// module.exports = {

// };

module.exports = {
    Usuario: require('../seguridad/model').Usuario,
    ClasifSolicitud: require('../seguridad/model').ClasifSolicitud,
    TipoSolicitud: require('../seguridad/model').TipoSolicitud,
    Solicitud: require('../seguridad/model').Solicitud,
    Accion: require('../seguridad/model').Accion,
    Permiso: require('../seguridad/model').Permiso,
}