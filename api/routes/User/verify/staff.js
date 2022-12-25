const express = require("express");
const router = express.Router();
const allowCors = require("../../../MiddleWares/AllowCors");
const Staff = require("../../../Modules/Users/staff");
const verifyUser = require("../../../MiddleWares/VerifyUser")//token verification



router
.route("/")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, verifyUser, async (req, res) => {
  try {
    const uid = req.user.uid
    let staff = await Staff.findById(uid)
    if(!staff) return res.status(400).json({message:'Staff dose not exist'});
    res.status(200).json(staff)
    
  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error)
  }
});
module.exports = router;
