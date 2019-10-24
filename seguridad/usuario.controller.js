const express = require('express');
const router = express.Router();
const userService = require('./usuario.service');


router.post('/authenticate', autenticate);
router.post('/register', register);
router.post('/registerMany', registerMany);
module.exports = router

function register(req, res, next) {
    userService.create(req.body,false)
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