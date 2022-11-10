const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ROLES_LIST } = require('../utils/variables')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        user: {
            type: Number,
            default: ROLES_LIST.USER
        },
        editor: Number,
        admin: Number,
    },
    refreshToken: String
}, {
    collection: 'users',
    timestamps: true
});

module.exports = mongoose.model('users', userSchema)