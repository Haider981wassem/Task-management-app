const express = require("express");
const router = express.Router();
const statusController = require("../Controllers/Status.controller");

router.get("/",statusController.getAllStatus);
router.get("/:id",statusController.getByIdStatus);
router.post("/",statusController.createStatus);
router.put("/:id",statusController.updateStatus);
router.delete("/:id",statusController.deleteStatus);

module.exports = router;