// var db = require('_helpers/db');
var config = require('config.json');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var db = require('_helpers/db');
var User = db['Usuario'];
var randT = require('rand-token');
// const mongoose = require('mongoose');

module.exports = {
    create,
    createMany,
    authenticate,
    createClasif,
    createTipo,
    createSolic,
    createPermiso,
    createAccion
}
var refreshTokens = {};

async function authenticate({ username, password }) {
    const user = await User.findOne({
        username: username
    });
    console.log(username, password, user);
    if (bcrypt.compareSync(password, user.password)) {
        user.loggedIn = true;
        const {
            hash,
            ...userWithoutHash
        } = user.toObject();
        const token = jwt.sign({
            name: username,
            sub: user.id,
            rol: ''
        },
            config.secret, {
            expiresIn: 60
        });

        user.accesToken = token;
        const tokenRefresh = randT.generate(16);
        refreshTokens[tokenRefresh] = username;
        await user.save();
        return {
            ...userWithoutHash,
            token,
            tokenRefresh
        };
    }
    // return user;

}

Array.prototype.asyncFor = async function (callback) {
    for (let index = 0; index < this.length; index++) {
        await callback(this[index], index, this);
    }
}

async function create(userParam) {
    if (await User.findOne({
        username: userParam.username
    })) {
        throw 'Username"' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    await user.save((error) => {
        if (error) {
            // console.log(error);
            return error;
        }
    });
    return user;
}

async function createMany(usersParams) {
    const indices = usersParams.map((current) => current.username);
    let users = [];
    let exist = [];
    let result = new Object();
    await User.find({
        username: { $in: indices }
    }, (err, arr) => {
        if (arr) {
            exist = arr.map((current) => current.username);
        }
    });
    const add = usersParams.filter((current) => {
        if (!exist.includes(current.username)) {
            if (current.password) {
                current.password = bcrypt.hashSync(userParam.password, 10);
            }
            return new User(current);
        }
    });
    if (add.length > 0) {
        await cUser.insertMany(add, (error, succ) => {
            users.push(succ);
        })
    }
    result['result'] = users;
    result['exist'] = exist;
    return result;


}

async function createClasif(clasifParams) {
    if (await db.ClasifSolicitud.findOne({
        descripcion: clasifParams.descripcion
    })) {
        throw 'Ya existe';
    }

    const Clasif = new db.ClasifSolicitud(clasifParams);
    await Clasif.save((error) => {
        if (error) {
            // console.log(error);
            return error;
        }
    });
    return Clasif;
}

async function createTipo(TipoParams) {
    if (await db.TipoSolicitud.findOne({
        descripcion: TipoParams.descripcion
    })) {
        throw 'Ya existe';
    }

    const Clasif = await db.ClasifSolicitud.findById(TipoParams.clasificacion);
    if (!Clasif) {
        throw 'No existe esta clasificacion';
    }
    const Tipo = new db.TipoSolicitud(TipoParams);
    await Tipo.save((error) => {
        if (error) {
            throw error;
        }
    });

    Clasif.tipos.push(Tipo.id);
    await Clasif.save((error) => {
        if (error) {
            throw error;
        }
    })
    return Tipo;
}


async function createSolic(SolicParams) {
    if (await db.Solicitud.findOne({
        descripcion: SolicParams.descripcion
    })) {

        throw 'Ya existe';
    }
    if (!await db.ClasifSolicitud.findOne({
        _id: SolicParams.clasificacion,
        tipos: SolicParams.tipo
    })) {

        throw 'Clasificacion no existe';
    };
    if (!await db.TipoSolicitud.findById(SolicParams.tipo)) {

        throw 'El tipo no existe';
    }
    const Solic = new db.Solicitud(SolicParams);
    await Solic.save((error) => {
        if (error) {
            return error;
        }
    });

    return Solic;
}

async function createAccion(accionParams) {
    if (await db.Accion.findOne({
        descripcion: accionParams.descripcion
    })) {
        throw 'Ya existe';
    }
    const Accion = new db.Accion(accionParams);
    await Accion.save((error) => {
        if (error) {
            return error;
        }
    });

    return Accion;
}

async function createPermiso(permisoParams) {
    if (await db.Permiso.findOne({
        descripcion: permisoParams.descripcion
    })) {
        throw 'Ya existe';
    }

    await permisoParams.permisos.asyncFor(async (res) => {
        if (!await db.ClasifSolicitud.findOne({
            _id: res.clasificacion,
            tipos: res.tipo
        })) {
            throw 'Clasificacion no existe';
        } else {
            console.log("Clasificacion existe");
        };
        if (!await db.TipoSolicitud.findById(res.tipo)) {
            throw 'El tipo no existe';
        } else {
            console.log("Tipo existe");
        }
    });


    const Permiso = new db.Permiso(permisoParams);
    await Permiso.save((error) => {
        if (error) {
            return error;
        }
    });

    return Permiso;
}
