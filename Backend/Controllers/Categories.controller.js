const Category = require("../models/Categories.model");

const getAllCategory = async(req,res) =>{
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);    
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const getByIdCategory = async(req,res) =>{
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if(!category){
            return res.status(400).json({message: "category not found"});
        }
        return res.status(200).json(category);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const createCategory = async(req,res)=>{
    try {
        const {Name, Color} = req.body;
        if(!Name || !Color){
            return res.status(400).json({message: "filled required"});
        }
        if(Name.length<3 || Name.length>50){
            return res.status(400).json({message: "fill this between 3 to 50"});
        }
        const created = await Category.create({Name,Color});
        if(!created){
            return res.status(400).json({message: "message not created"});
        }
        return res.status(201).json({message: "categories created successfully", data:created});
        
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const updateCategory = async(req,res)=>{
    try {
        const id = req.params.id;
        const {Name,Color}=req.body;
        const updated = await Category.findByIdAndUpdate(id, {Name,Color}, {new : true});
        if(!updated){
            return res.status(400).json({message: "not founded"});
        }
        return res.status(200).json({message: "data updated", data:updated});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const deleteCategory = async(req,res)=>{
    try {
      const id = req.params.id;
      const deleted = await Category.findByIdAndDelete(id);
      if(!deleted){
        return res.status(400).json({message: "not founded"});
      }
      return res.status(200).json({message: "category deleted successfully", data: deleted});   
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const categoryController = {getAllCategory,getByIdCategory,createCategory,updateCategory,deleteCategory};

module.exports = categoryController;

