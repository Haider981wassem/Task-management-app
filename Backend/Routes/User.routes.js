const express = require("express");
const router = express.Router();
const userController = require("../Controllers/User.controller");
const authMiddleware = require("../Middleware/authMiddleware");
const upload = require("../Config/upload");

router.post("/signup", upload.single("Image"),userController.Signup);
router.post("/login", userController.Login);
router.get("/:id", authMiddleware, userController.getByIdUser);
router.put("/:id", authMiddleware, upload.single("Image"),userController.updateUser);

module.exports = router;