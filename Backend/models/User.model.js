const mongoose = require("mongoose");
const {SchemaTypes} = require("mongoose");

const userSchema = new mongoose.Schema({
    FullName: {
        type: SchemaTypes.String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    Email: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    Password: {
        type: SchemaTypes.String,
        required: true,
    },
    Image: {
        type: SchemaTypes.String,
    },
    Contact: {
        type: SchemaTypes.String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;