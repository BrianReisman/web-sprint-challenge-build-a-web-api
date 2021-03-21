const Actions = require("./actions-model");

async function validateId(req, res, next) {
  if (!req.params.id) {
    res.status(400).json({ message: "an ID is required" });
  } else {
    try {
      const data = await Actions.get(req.params.id);
      if (data) {
        req.id = req.params.id;
        req.data = data;
        next();
      } else {
        res.status(404).json(`${req.params.id} is not a valid ID. A valid ID is required`); //![]
      }
    } catch (err) {
      next(err);
    }
  }
}

function validateActionBody(req, res, next) {
  if (
    !req.body.project_id ||
    !req.body.description ||
    req.body.description.length > 128 ||
    !req.body.notes
  ) {
    res.status(400).json({
      message:
        "project_id, description, are notes are required and description must be under 128 characters in length",
    });
  } else {
    // req.body = { ...req.body, completed: false };
    // req.body = { ...req.body};
    next();
  }
}

module.exports = {
  validateActionBody,
  validateId,
};
