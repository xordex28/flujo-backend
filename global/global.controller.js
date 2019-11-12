const express = require('express');
const router = express.Router();
const global = require('./global.service');
router.get('/getSchemas', getSchemas);
router.get('/getSchemas/:id', getSchemaIndex);
router.post('/refreshProperty', refreshProperty);
router.post('/registerMany',registerMany);
module.exports = router


function getSchemas(req, res, next) {
    global.getSchemaDb()
    .then((resp)=>res.json(resp))
    .catch((err)=>next(err));
}

function getSchemaIndex(req, res, next) {
    global.getIndexSchema(req.params.id)
    .then((resp)=>res.json(resp))
    .catch((err)=>next(err));
}

function refreshProperty(req, res, next) {
    global.renameIndexJSON(req.body.arr, req.body.change)
        .then((resp) => res.json(resp))
        .catch((err) => next(err));
}

function registerMany(req, res, next) {
    global.registerShemaMany(req.body.schema,req.body.data,req.body.unique)
        .then((resp) => res.json(resp))
        .catch((err) => next(err));
}