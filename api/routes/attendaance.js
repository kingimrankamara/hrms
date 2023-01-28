const express = require("express");
const allowCors = require("../MiddleWares/AllowCors");
const router = express.Router();
const Attendance = require("../Modules/Attendance");
const VerifyUser =require("../MiddleWares/VerifyUser")


router
.route("/checkin")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, VerifyUser,async (req, res) => {
  try {
    const uid = req.user.uid;
    
    let attendance = new Attendance(req.body)
    console.log(attendance)
    attendance.save().then(data=>{
      res.status(200).json(data);
    }).catch(err=>{
      res.json(400).json(err)
    })
  }catch(error){
     error = {message:"Internal Server Error on checkin"}
     res.status(500).json(error.message);
  }
});


router
.route("/checkout/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions,VerifyUser, async (req, res) => {
  try {
    //const uid = req.user.uid;
    const id = req.params.id;
    let checkOutDate =new Date()
    let attendance = await Attendance.findByIdAndUpdate(id,{clockOut:checkOutDate});
    res.status(200).json(attendance)
  }catch(error){
     res.json(error)
  }
});



router
.route("/delete/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions,VerifyUser, async (req, res) => {
  try {
    const uid = req.user.uid;
    const id = req.params.id;
   let attendance = await Attendance.findByIdAndDelete(id);
   res.status(200).json({message:'Deleted'})
  }catch(error){
     res.json(error)
  }
});

module.exports = router;
