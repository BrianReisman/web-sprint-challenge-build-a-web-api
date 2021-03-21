// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const middleware = require("./projects-middleware");

//configure
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await Projects.get();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", middleware.validateID, async (req, res, next) => {
  res.status(200).json(req.data);
});

router.post("/", middleware.validateBody, async (req, res, next) => {
  console.log("inside of [POST]");
  try {
    const newProject = await Projects.insert(req.body);
    if (newProject) {
      res.status(201).json(newProject);
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log("error");
  }
});

//error
// function errorHandler(err, req, res, next) {}

//export
module.exports = router;
