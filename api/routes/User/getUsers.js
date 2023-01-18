const express = require("express");
const router = express.Router();
const allowCors = require("../../MiddleWares/AllowCors");
const User = require("../../Modules/User");
const verifyUser = require("../../MiddleWares/VerifyUser")
const VerifyAdmin = require("../../MiddleWares/access/VerifyAdmin")


router
.route("/")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions,verifyUser,VerifyAdmin, async (req, res) => {
  try {
   let user = await User.find({})
    res.status(200).json(user)
  }catch(error){
     res.json(error)
  }
});
module.exports = router;
