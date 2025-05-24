const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const superheroController = require("../controllers/superheroController");

router.get("/", superheroController.getAllSuperheroes);
router.get("/:id", superheroController.getSuperheroById);
router.post("/", upload.array("images"), superheroController.addSuperhero);
router.put("/:id", upload.array("images"), superheroController.updateSuperhero);
router.delete("/:id", superheroController.deleteSuperhero);

module.exports = router;
