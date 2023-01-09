const express = require("express");
const joi = require("joi");
const allowCors = require("../MiddleWares/AllowCors");
const router = express.Router();
const Trainings = require("../Modules/Trainings");


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      name: joi.string().required(),
      startedDate: joi.any(),
      teachers:joi.any(),
      description: joi.string()
    }).unknown();

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let subject = new Trainings(req.body);

    subject.save()
      .then((data) => {
        res.status(200).json( data);
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save subject" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all subject
router
.route("/getSubjects")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let subject = await Trainings.find().populate('teachers');
    res.status(200).json(subject)
  }catch(error){
     res.json(error)
  }
});


//get single department
router
.route("/get/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
    const id = req.params.id;
   let subject = await Trainings.findById(id).populate("teachers")
   //teachers here
   res.status(200).json(subject)
  }catch(error){
     res.json(error)
  }
});


//update subject data
//update subject
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Trainings.findByIdAndUpdate(uid,req.body, function(err, resp){
      if(err){
        res.json(err.message);
      }
      res.json(resp);
    })
  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error.message)
  }
});

module.exports = router;
