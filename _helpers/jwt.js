const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../seguridad/usuario.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({
        secret,
        isRevoked
    }).unless({
        path: [
            // Lista de rutas que no requieren Autenticación
            '/segurity/user/authenticate',
            '/segurity/user/register',
          
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById({_id:payload.sub});
    // Rovacar Toen si el usuario no existe
    if (!user) {
        console.log('User Not Found');
        return done(null, true);
    }

    done();
};