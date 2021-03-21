// function validateId(req,res,next){
//   if(req.params.id){
//     next()
//   } else {
//     res.status(400).json({message: "an ID is required"})
//   }
// })

function validateActionBody(req, res, next) {
  if (
    !req.body.project_id ||
    !req.body.description ||
    req.body.description.length > 128 ||
    !req.body.notes
  ) {
    res
      .status(400)
      .json({
        message:
          "project_id, description, are notes are required and description must be under 128 characters in length",
      });
  } else {
    req.body = {...req.body, completed: false}
    next();
  }
}

module.exports = {
  validateActionBody,
};
