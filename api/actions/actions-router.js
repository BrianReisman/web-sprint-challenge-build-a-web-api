//require
const express = require("express");
const Actions = require("./actions-model");
const middleware = require("./actions-middleware");

//configure
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const data = await Actions.get();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json([]);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await Actions.get(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: `No action with an ID of ${id} exists.`,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", middleware.validateActionBody, async (req, res, next) => {
  try {
    const data = await Actions.insert(req.body);
    if (data) {
      res.status(200).json(req.body);
    } else {
      res.status(400).json({
        message: `Unable to create action.`,
      });
    }
  } catch (err) {
    next(err);
  }
});

//error
function errorHandler(error, req, res, next) {
  res.status(500).json(error.mesage);
}

//export
module.exports = router;
