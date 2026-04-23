const express = require("express");
const router = express.Router();

const ProjectController = require("../controllers/project.controller");

router.post("/",  ProjectController.createProject);

router.get("/",  ProjectController.getMyProjects);

router.get("/:id", ProjectController.renameProject);

router.delete("/:id",ProjectController.deleteProject);

module.exports = router;