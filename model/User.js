const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: 0,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;