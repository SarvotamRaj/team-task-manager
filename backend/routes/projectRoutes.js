const express = require("express");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE PROJECT
router.post("/", protect, createProject);


// GET PROJECTS
router.get("/", protect, getProjects);

module.exports = router;