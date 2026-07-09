const Status = require("../models/Status.model");

const getAllStatus = async(req,res) =>{
    try {
        const statuss = await Status.find();
        return res.status(200).json(statuss);    
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const getByIdStatus = async(req,res) =>{
    try {
        const id = req.params.id;
        const status = await Status.findById(id);
        if(!status){
            return res.status(400).json({message: "status not found"});
        }
        return res.status(200).json(status);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const createStatus = async(req,res)=>{
    try {
        const {Name, Icon} = req.body;
        if(!Name || !Icon){
            return res.status(400).json({message: "filled required"});
        }
        if(Name.length<3 || Name.length>50){
            return res.status(400).json({message: "fill this between 3 to 50"});
        }
        const created = await Status.create({Name,Icon});
        if(!created){
            return res.status(400).json({message: "message not created"});
        }
        return res.status(201).json({message: "status created successfully", data:created});
        
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const updateStatus = async(req,res)=>{
    try {
        const id = req.params.id;
        const {Name,Icon}=req.body;
        const updated = await Status.findByIdAndUpdate(id, {Name,Icon}, {new : true});
        if(!updated){
            return res.status(400).json({message: "not founded"});
        }
        return res.status(200).json({message: "data updated", data:updated});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const deleteStatus = async(req,res)=>{
    try {
      const id = req.params.id;
      const deleted = await Status.findByIdAndDelete(id);
      if(!deleted){
        return res.status(400).json({message: "not founded"});
      }
      return res.status(200).json({message: "status deleted successfully", data: deleted});   
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const statusController = {getAllStatus,getByIdStatus,createStatus,updateStatus,deleteStatus};

module.exports = statusController;
