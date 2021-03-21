const Projects = require("./projects-model");

async function validateID(req, res, next) {
  if (req.params.id) {
    try {
      const data = await Projects.get(req.params.id);
      if (!data) {
        res.status(404).json({ message: "invalid ID provided" });
      } else {
        req.data = data;
        req.id = req.params.id;
        next();
      }
    } catch (err) {
      res.status(500).json({ message: "error occured on the server" });
    }
  } else {
    res.status(400).json({ message: "an id param is required" });
  }
}

async function validateBody(req, res, next) {
  if(!req.body || !req.body.name || !req.body.description){
    res.status(400).json({message: "Both name and description are requried strings"})
  } else {
    next()
  }

}

module.exports = {
  validateID,
  validateBody,
};
