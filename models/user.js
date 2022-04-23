const mongoose = require('mongoose');

const plm = require('passport-local-mongoose');

var userSchemaDefinition = {
    username: String,
    password: String,
    oauthId: String, //?
    oauthProvider: String, //?
    created: Date,

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}

var userSchema = new mongoose.Schema(userSchemaDefinition);

// Send new user to hash

userSchema.plugin(plm);

module.exports = new mongoose.model('User', userSchema);