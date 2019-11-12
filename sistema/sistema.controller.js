const express = require('express');
const router = express.Router();
const systemService = require('./sistema.service');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});

router.post('/file', multipartMiddleware, getFile);
module.exports = router;

function getFile(req, res, next) {
    // systemService.csvParse(req.files.files.path)
    systemService.csvParse(req.files.uploads[0].path)
    .then((resp)=>res.json(resp))
    .catch((err)=>next(err));
}