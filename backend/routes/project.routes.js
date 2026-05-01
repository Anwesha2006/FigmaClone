const express = require("express");
const router = express.Router();

const ProjectController = require("../controllers/project.controller");
const protect = require("../middleware/auth.middleware");

router.post("/", protect, ProjectController.createProject);

router.get("/", protect, ProjectController.getMyProjects);

router.get("/:id", protect, ProjectController.renameProject);

router.put("/:id", protect, ProjectController.saveProject);

router.put("/:id/status", protect, ProjectController.updateProjectStatus);

router.delete("/:id", protect, ProjectController.deleteProject);

router.post("/:id/invite", protect, ProjectController.inviteUser);

module.exports = router;