var db = require('_helpers/db');

module.exports = {
    getIndexSchema,
    getSchemaDb,
    renameIndexJSON,
    registerShemaMany
}
function renameProperty(objeto, oldName, newName) {
    //Do nothing if the names are the same
    if (oldName == newName) {
        return objeto;
    }
    //Check for the old property name to avoid a ReferenceError in strict mode.
    if (objeto.hasOwnProperty(oldName)) {
        objeto[newName] = objeto[oldName];
        delete objeto[oldName];
    }
    return objeto;
};

function getSchemaDb() {
    return new Promise((res, rej) => {
        const arr = Object.keys(db);
        if (arr) {
            res(arr);
        } else {
            rej("No existen esquemas en la base de datos");
        }
    })

}

function getIndexSchema(schema) {
    return new Promise((res, rej) => {
        if (schema) {
            if (db[schema]) {
                const keys = Object.keys(db[schema].schema.paths);
                let properties = keys.map((res, index) => {
                    return {
                        key: res,
                        type: db[schema].schema.paths[res].instance,
                        required: db[schema].schema.paths[res].isRequired
                    }
                });
                res(properties);
            } else {
                rej("El esquema seleccionado no existe");
            }
        } else {
            rej("No hay un esquema seleccionado");
        }
    });
}

function renameIndexJSON(array, changes) {
    return new Promise((res, rej) => {
        if (array.length>0) {
            let newArray = array.map((res, index, arr) => {
                changes.forEach((change) => {
                    renameProperty(res, change.old, change.new);
                });
                return res;
            });
            res(newArray);
        } else {
            rej("Array Vacio");
        }
    })
}

async function registerShemaMany(schema, data, unique) {
    console.time("x");
    const model = db[schema];
    const uniques = data.map((req) =>{
         return req[unique];
        });
    const config = {};
    let obmitir = [];
    let agregar = [];
    let aprovados = [];
    let errores = [];

    config[unique] = { $in: uniques };
    await model.find(config, (err, arr) => {
        if (arr) {
            obmitir = arr.map((current) => {
                return current[unique]
            });
        }
    });

    data.forEach((current) => {
        if (!obmitir.includes(current[unique])) {
            let doc = new model(current);
            agregar.push(doc);
        }
    });

    if (agregar.length > 0) {
    await new Promise((res, rej) => {
        model.insertMany(agregar, (error, succ) => {
            console.log("res");
            if (succ) {
                aprovados.push(succ);
            }
            if (error) {
                errores.push(error);
            }
            res();
        });
    })
    }

    console.log("listo");
    console.timeEnd("x");
    return {
        aprovados: aprovados,
        rechazados: obmitir,
        errores: errores
    };
}