const express = require("express");
const Joi = require("joi");
const allowCors = require("../MiddleWares/AllowCors");
const router = express.Router();
const Lone = require("../Modules/Lone");




//update lone data
//update lone
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Lone.findByIdAndUpdate(uid,req.body, function(err, resp){
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

//get all lone
router
.route("/getlones")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let lone = await Lone.find().populate({
    path:'requestedBy',
     model: 'staff'
  })
    res.status(200).json(lone)
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
   let lone = await Lone.findById(id).populate("requestedBy")
   //teachers here
   res.status(200).json(lone)
  }catch(error){
     res.json(error)
  }
});


module.exports = router;
