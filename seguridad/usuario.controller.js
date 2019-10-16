const express = require('express');
const router = express.Router();
const userService = require('./usuario.service').default;

router.post('/register',register);
router.post('/registerMany',registerMany);
module.exports = router

function register(req, res, next) {
    userService.create(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
}

function registerMany(req,res,next){
    userService.createMany(req.body)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => next(err));
}