const Task = require("../models/Task.model");

const getAllTask = async(req,res) => {
    try {
        const userId = req.user.id
        const tasks = await Task.find({userId}).populate("categoryId").populate("statusId").populate("userId", "-Password");
        return res.status(200).json(tasks);    
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const getByIdTask = async(req,res) =>{
    try {
        const id = req.params.id;
        const task = await Task.findById(id).populate("categoryId").populate("statusId").populate("userId");
        if(!task){
            return res.status(400).json({message: "task not found"});
        }
        return res.status(200).json(task);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const createTask = async(req,res)=>{
    try {
        const userId = req.user.id;
        const {Title, Description, Progress, DueDate, DueTime, categoryId, statusId} = req.body;
        if(!Title || !Description || Progress === undefined || !DueDate || !DueTime){
            return res.status(400).json({message: "filled required"});
        }
        const created = await Task.create({Title, Description, Progress, DueDate, DueTime, categoryId, statusId, userId});
        if(!created){
            return res.status(400).json({message: "message not created"});
        }
        return res.status(201).json({message: "task created successfully", data:created});
        
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const updateTask = async(req,res)=>{
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const {Title, Description, Progress, DueDate, DueTime, categoryId, statusId}=req.body;
        const updated = await Task.findByIdAndUpdate(id, {Title, Description, Progress, DueDate, DueTime, categoryId, statusId, userId}, {new : true});
        if(!updated){
            return res.status(400).json({message: "not founded"});
        }
        return res.status(200).json({message: "data updated", data:updated});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const deleteTask = async(req,res)=>{
    try {
      const id = req.params.id;
      const deleted = await Task.findByIdAndDelete(id);
      if(!deleted){
        return res.status(400).json({message: "not founded"});
      }
      return res.status(200).json({message: "task deleted successfully", data: deleted});   
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const toggleFavorite = async (req,res) => {
 try {
  const id = req.params.id;
  const task = await Task.findById(id);
  if (!task){
    return res.status(404).json({message: "task not founded"});
  }
  task.isFavourite = !task.isFavourite;
  await task.save();
  return res.status(200).json({message: "favourite", data: task});  
 } catch (err) {
    return res.status(500).json({message: err.message});
 }   
};

const getFavouriteTask = async (req,res) => {
    try {
        const userId = req.user.id
        const tasks = await Task.find({isFavourite: true, userId}).populate("categoryId").populate("statusId").populate("userId");
        return res.status(200).json(tasks);
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};

const taskController = {getAllTask, getByIdTask, createTask, updateTask, deleteTask, toggleFavorite, getFavouriteTask};

module.exports = taskController;
