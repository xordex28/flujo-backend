var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 8
    },
    password: {
        type: String,
        required: true,
        maxlength: 50
    },
    last_password: {
        type: String,
        maxlength: 50
    },
    first_name: {
        type: String,
        required: true,
        maxlength: 30
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 30
    },
    identification: {
        type: String,
        required: true,
        maxlength: 10
    },
    email: {
        type: String,
        maxlength: 30,
        default: null
    },
    last_ip: {
        type: String,
        maxlength: 30,
        default: null
    },
    loggedIn: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    updatedDate: {
        type: Date,
        default: null
    },
    updatedDatePass: {
        type: Date,
        default: null
    },
    token: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
    roll: {
        type: Schema.Types.ObjectId,
        ref: 'roll',
        default:null
    }
});

userSchema.set('toJSON', {
    virtuals: true
});

const Usuario = mongoose.model('users', userSchema);

module.exports = {
    Usuario
}