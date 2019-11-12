var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    last_password: {
        type: String,
        // maxlength: 50
    },
    first_name: {
        type: String,
        required: true,
        // maxlength: 30
    },
    last_name: {
        type: String,
        required: true,
        // maxlength: 30
    },
    identification: {
        type: String,
        required: true,
        // maxlength: 10
    },
    email: {
        type: String,
        // maxlength: 30,
        default: null
    },
    last_ip: {
        type: String,
        // maxlength: 30,
        default: null
    },
    loggedIn: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: null
    },
    updatedDatePass: {
        type: Date,
        default: null
    },
    accestoken: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
    roll: {
        type: Schema.Types.ObjectId,
        ref: 'roll',
        default: null
    }
});

userSchema.set('toJSON', {
    virtuals: true
});



var solicitud = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    clasificacion: {
        type: Schema.Types.ObjectId,
        ref: "clasifSolicitud",
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: "tipoSolicitud",
        default: null,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    respDate: {
        type: Date,
        default: null
    }
});

solicitud.set('toJSON', {
    virtuals: true
});

var tipoSolicitud = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    clasificacion: {
        type: Schema.Types.ObjectId,
        ref: "clasifSolicitud",
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }

});

tipoSolicitud.set('toJSON', {
    virtuals: true
});

var clasifSolicitud = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    tipos: [{
        type: Schema.Types.ObjectId,
        ref: "tipoSolicitud",
        required: true,
        default: []
    }],
    createdDate: {
        type: Date,
        default: Date.now()
    }

});

clasifSolicitud.set('toJSON', {
    virtuals: true
});

var accion = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: Number,
        default: 1
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }

});

accion.set('toJSON', {
    virtuals: true
});

var permiso = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    permisos: [{
        clasificacion: {
            type: Schema.Types.ObjectId,
            ref: 'clasifSolicitud',
            required: true
        },
        tipo: {
            type: Schema.Types.ObjectId,
            ref: 'tipoSolicitud',
            required: true
        },
        acciones: [{
            type: Schema.Types.ObjectId,
            ref: 'accion',
            required: true
        }]
    }],
    createdDate: {
        type: Date,
        default: Date.now()
    }

});

permiso.set('toJSON', {
    virtuals: true
});

const Usuario = mongoose.model('users', userSchema);
const ClasifSolicitud = mongoose.model('clasifSolicitud', clasifSolicitud);
const TipoSolicitud = mongoose.model('tipoSolicitud', tipoSolicitud);
const Solicitud = mongoose.model('solicitud', solicitud);
const Accion = mongoose.model('accion', accion);
const Permiso = mongoose.model('permiso', permiso);

module.exports = {
    Usuario,
    ClasifSolicitud,
    TipoSolicitud,
    Solicitud,
    Accion,
    Permiso
}