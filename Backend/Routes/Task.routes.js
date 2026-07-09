const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/Task.controller");
const authMiddleware = require("../Middleware/authMiddleware");

router.get("/",authMiddleware,taskController.getAllTask);
router.get("/favorites",authMiddleware,taskController.getFavouriteTask);
router.get("/:id",authMiddleware,taskController.getByIdTask);
router.post("/",authMiddleware,taskController.createTask);
router.put("/:id",authMiddleware,taskController.updateTask);
router.delete("/:id",authMiddleware,taskController.deleteTask);
router.put("/:id/favorite",authMiddleware,taskController.toggleFavorite);

module.exports = router;