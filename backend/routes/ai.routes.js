const express = require("express");
const router = express.Router();
const AiController = require("../controllers/ai.controller");
const protect = require("../middleware/auth.middleware");

router.post("/generate", protect, AiController.generateFromPrompt);

module.exports = router;
