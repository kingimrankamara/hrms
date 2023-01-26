const express = require("express");
const Joi = require("joi");
const allowCors = require("../MiddleWares/AllowCors");
const router = express.Router();
const Attendance = require("../Modules/Attendance");
const VerifyUser =require("../MiddleWares/VerifyUser")



//update attendance data
//update attendance
router
.route("/checkin")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, VerifyUser,async (req, res) => {
  try {
    const uid = req.user.uid;
    let attendance = new Attendance(req.body)
    attendance.save(attendance).then(data=>{
      res.status(200).json(data);
    }).catch(err=>{
      res.json(400).json(err)
    })
  }catch(error){
     error = {message:"Internal Server Error on checkin"}
     res.json(error.message);
  }
});

//get all attendance
router
.route("/checkout/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions,VerifyUser, async (req, res) => {
  try {
    const uid = req.user.uid;
    const id = req.params.id;
   let attendance = await Attendance.findById(id)
    res.status(200).json(attendance)
  }catch(error){
     res.json(error)
  }
});


//get single department
router
.route("/delete/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions,VerifyUser, async (req, res) => {
  try {
    const uid = req.user.uid;
    const id = req.params.id;
   let attendance = await Attendance.findById(id).populate("requestedBy")
   //teachers here
   res.status(200).json(attendance)
  }catch(error){
     res.json(error)
  }
});


module.exports = router;
