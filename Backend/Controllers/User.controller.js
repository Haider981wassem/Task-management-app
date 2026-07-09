const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
    try {
        const { FullName, Email, Contact, Password } = req.body;
        if (!FullName || !Email || !Contact || !Password) {
            return res.status(400).json({ message: "filled requires" });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        const image = req.file ? req.file.filename : null; 
        const signup = await User.create({ FullName, Email, Contact, Password: hashedPassword, Image: image });
        return res.status(201).json({ message: "signup successfully", data: signup });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).json({ message: "fill required" });
        }
        const login = await User.findOne({ Email });
        if (!login) {
            return res.status(400).json({ message: "email is required" });
        }
        const isMatch = await bcrypt.compare(Password, login.Password);
        if(!isMatch){
            return res.status(400).json({message: "invalid password"});
        }
        const { Password: _, ...userWithoutPassword} = login.toObject();
        const token = jwt.sign(
         {id: login.id},
         process.env.JWT_SECRET,
         {expiresIn: process.env.JWT_EXPIRES_IN}
        ); 
        return res.status(200).json({ message: "login successfully", token, data: userWithoutPassword});
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getByIdUser = async (req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-Password");
        if (!user){
            return res.status(400).json({message: "id not found"});
        }
        return res.status(200).json({message: "user founded:", user});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const updateUser = async (req,res) => {
    try {
     const id = req.params.id;
     const {FullName, Email, Contact} = req.body;
     const image = req.file ? req.file.filename : undefined;
     if(image) req.body.Image = image;
     const updated = await User.findByIdAndUpdate(id, req.body, {new: true});
     if(!updated){
        return res.status(400).json({message: "filled"});
     }
     return res.status(200).json({message: "update successfully", data:updated});        
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const userController = {Signup,Login, getByIdUser, updateUser};
module.exports = userController;