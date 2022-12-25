const express = require("express");
const joi = require("joi");
const allowCors = require("../../MiddleWares/AllowCors");
const router = express.Router();
const Leaves = require("../../Modules/Leave");


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      leaveType: joi.string(),
      startdDate: joi.string(),
      enddDate: joi.string(),
      requestedBy:joi.any(),
      description: joi.string().allow(null,'')
    }).unknown();

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let leave = new Leaves(req.body);

    leave.save()
      .then((data) => {
        res.status(200).json({ data, message: "leave created" });
    })
    .catch((err) => {
        console.log("not saved");
        res.status(400).json({ message: err, detail: "Unable to save leave" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all leave
router
.route("/getLeaves")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let leave = await Leaves.find().populate("requestedBy")
    res.status(200).json(leave)
  }catch(error){
     res.json(error)
  }
});


//get single leave
router
.route("/get/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
    const id = req.params.id;
   let leave = await Leaves.findById(id).populate("requestedBy")
   //teachers here
   res.status(200).json(leave)
  }catch(error){
     res.json(error)
  }
});


//update leave data
//update leave
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Leaves.findByIdAndUpdate(uid,req.body, function(err, resp){
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


router
.route("/delete/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Leaves.findByIdAndDelete(uid,req.body, function(err, resp){
      if(err){
        res.json(err);
      }
      res.json(resp);
    })
  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error)
  }
});

module.exports = router;
