//require
const express = require("express");

const Actions = require("./actions-model");

const router = express.Router();
//configure

router.get("/", async (req, res, next) => {
  try {
    const data = await Actions.get();
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: "error" });
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
