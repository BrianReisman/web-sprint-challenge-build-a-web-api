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

router.get("/:id", middleware.validateId, async (req, res, next) => {
  res.status(200).json(req.data);
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

router.put("/:id", middleware.validateId, async (req, res, next) => {
  try{
    const updatedAction = await Actions.update(req.id, req.body)
    res.status(200).json(updatedAction)
  } catch (err){
    next(err)
  }
});

//error
function errorHandler(error, req, res, next) {
  console.log(error);
  res.status(500).json(error.mesage);
}

//export
module.exports = router;
