// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const middleware = require("./projects-middleware");

//configure
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await Projects.get();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json([]);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", middleware.validateID, async (req, res, next) => {
  res.status(200).json(req.data);
});

router.post("/", middleware.validateBody, async (req, res, next) => {
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

router.put(
  "/:id",
  middleware.validateID,
  middleware.validateBody,
  async (req, res, next) => {
    console.log("inside of [PUT]");
    try {
      const updatedProject = await Projects.update(req.id, req.body);
      if (updatedProject) {
        res.status(200).json(updatedProject);
      } else {
        res.status(400).json({ message: "unable to update Project" });
      }
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", middleware.validateID, async (req, res, next) => {
  try {
    const deleted = await Projects.remove(req.id);
    if (deleted) {
      res.status(204).json({ message: "delete complete" });
    } else {
      res.status(400).json({ message: "delete *failed* to complete" });
    }
  } catch (err) {
    console.log("error in DELETE of projects");
  }
});

router.get("/:id/actions", middleware.validateID, async (req, res, next) => {
  try {
    const projectActions = await Projects.getProjectActions(req.id);
    if (projectActions) {
      res.status(200).json(projectActions);
    } else {
      res
        .status(404)
        .json({ message: "no action associated with this project" });
    }
  } catch (err) {
    next(err);
  }
});

//error
function errorHandler(err, req, res, next) {
  res.status(400).json({ message: "Server side error", err });
}

//export
module.exports = router;
