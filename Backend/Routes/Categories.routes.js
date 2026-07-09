const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/Categories.controller");

router.get("/",categoryController.getAllCategory);
router.get("/:id",categoryController.getByIdCategory);
router.post("/",categoryController.createCategory);
router.put("/:id",categoryController.updateCategory);
router.delete("/:id",categoryController.deleteCategory);

module.exports = router;