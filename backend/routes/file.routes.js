const express = require("express");
const router = express.Router();

const FileController = require("../controllers/file.controller");

router.post("/",  FileController.createFile);

router.get("/",  FileController.getAllFiles);

router.get("/:id", FileController.getFileById);

router.put("/:id", FileController.saveCanvasData);

router.delete("/:id",FileController.deleteFile);

module.exports = router;