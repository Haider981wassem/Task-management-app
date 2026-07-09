const mongoose = require("mongoose");
const {SchemaTypes} = require("mongoose");

const taskSchema = new mongoose.Schema({
    Title: {
        type: SchemaTypes.String,
        required: true
    },
    Description: {
        type: SchemaTypes.String,
        required: true
    },
    categoryId: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Category"
    },
    userId: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    statusId: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "Status"
    },
    Progress: {
        type: SchemaTypes.Number,
        required: true
    },
    DueDate: {
        type: SchemaTypes.Date,
        required: true
    },
    DueTime: {
        type: SchemaTypes.String,
        required: true
    },
    isFavourite: {
        type: SchemaTypes.Boolean,
        default: false
    }
});

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;