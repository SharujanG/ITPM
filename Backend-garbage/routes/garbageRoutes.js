const express = require("express");
const router = express.Router();
const garbageController = require("../controllers/garbageController");

router.post("/Garbages", garbageController.create);

router.get("/Garbages", garbageController.findAll);

router.get("/Garbages/:id", garbageController.findOne);

router.put("/Garbages/:id", garbageController.update);

router.delete("/Garbages/:id", garbageController.delete);

module.exports = router;
