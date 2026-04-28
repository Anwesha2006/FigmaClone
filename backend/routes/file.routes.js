const express = require("express");
const router = express.Router();

const FileController = require("../controllers/file.controller");
const protect = require("../middleware/auth.middleware");

router.post("/", protect, FileController.createFile);

router.get("/recent", protect, FileController.getMyFiles);

router.get("/", protect, FileController.getAllFiles);

router.get("/:id", FileController.getFileById);

router.put("/:id/canvas", protect, FileController.saveCanvasData);

router.delete("/:id", protect, FileController.deleteFile);

router.post("/export", FileController.exportFile); // no auth needed for stateless export

router.put("/:id/share", protect, FileController.updateLinkSharing);

module.exports = router;