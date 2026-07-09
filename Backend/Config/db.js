require("dotenv").config();
const mongoose = require("mongoose");
const {connect} = require("mongoose");

const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("mongodb is connected");
    } catch (err) {
        console.log(`mongodb is not connected ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;