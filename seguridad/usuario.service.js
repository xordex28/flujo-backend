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
    authenticate
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

async function create(userParam, confirm) {
    // const session = await mongoose.startSession();
    // session.startTransaction();
    // try {
    //     const resp = await User(userParam).save({ session: session });

    //     if (!confirm) {
    //         await session.abortTransaction();
    //         session.endSession();
    //         throw error;
    //     }
    // } catch (error) {
    //     console.log(error)
    // }

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