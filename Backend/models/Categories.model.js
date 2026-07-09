const mongoose = require("mongoose");
const {SchemaTypes} = require("mongoose");

const categorySchema = new mongoose.Schema({
    Name : {
        type: SchemaTypes.String,
        required: true
    },
    Color : {
        type: SchemaTypes.String,
        required: true
    }
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;