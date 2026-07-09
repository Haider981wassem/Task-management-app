const mongoose = require("mongoose");
const {SchemaTypes} = require("mongoose");

const statusSchema = new mongoose.Schema({
    Name : {
        type: SchemaTypes.String,
        required: true
    },
    Icon : {
        type: SchemaTypes.String,
        required: true
    } 
});

const Status = mongoose.model("Status", statusSchema);
module.exports = Status;