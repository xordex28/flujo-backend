const express = require('express');
const router = express.Router();
const userService = require('./usuario.service');


router.post('/authenticate', autenticate);
router.post('/register', register);
router.post('/registerMany', registerMany);


router.post('/createClasif', createClasif);
router.post('/createTipo', createTipo);
router.post('/createSolic', createSolic);
router.post('/createAccion', createAccion);
router.post('/createPermiso', createPermiso);


module.exports = router

function register(req, res, next) {
    userService.create(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
}

function registerMany(req, res, next) {
    userService.createMany(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
}

function autenticate(req, res, next) {
    console.log(req.body);
    userService.authenticate(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
}
/////////////////////////
function createClasif(req, res, next) {
    console.log(req.body);
    userService.createClasif(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
}


function createTipo(req, res, next) {
    console.log(req.body);
    userService.createTipo(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
}


function createSolic(req, res, next) {
    userService.createSolic(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
    
}

function createAccion(req, res, next) {
    userService.createAccion(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
}

function createPermiso(req, res, next) {
    userService.createPermiso(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
}