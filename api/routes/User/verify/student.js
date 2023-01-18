const express = require("express");
const router = express.Router();
const allowCors = require("../../../MiddleWares/AllowCors");
const Student = require("../../../Modules/Users/students");
const verifyUser = require("../../../MiddleWares/VerifyUser")



router
.route("/")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, verifyUser, async (req, res) => {
  try {
    const uid = req.user.uid
    let studet = await Student.findById(uid)
    if(!studet) return res.status(400).json({message:'Student dose not exist'});
    res.status(200).json(studet)
    
  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error)
  }
});
module.exports = router;
