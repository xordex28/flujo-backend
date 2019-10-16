var db = require('_helpers/db');
var User = db["Usuario"];
module.exports = {
    create,
    createMany
}

async function create(userParam) {
    if (await User.findOne({
        username: userParam.username
    })) {
        throw 'Username"' + userParam.username + '" is already taken';
    }
    const user = new User(userParam);
    await user.save((error) => {
        if (error) {
            console.log(error);
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