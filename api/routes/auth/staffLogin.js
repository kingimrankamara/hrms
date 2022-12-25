const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const allowCors = require("../../MiddleWares/AllowCors");
const Staff = require("../../Modules/Users/staff");


//login
router
  .route("/login")
  .options(allowCors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(allowCors.corsWithOptions, async (req, res) => {
    try {
      const regSchema = joi.object({
        password: joi.string().min(7).required(),
        staffId: joi.string().required()
      });
      const { error } = regSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          error: error,
          message: "Please enter a valid Staff ID and password",
        });

      //check db for staff by staff email
      const staff = await Staff.findOne({ staffId: req.body.staffId });
      if (!staff){
     let err={
        message:"Invalid Staff ID"
      }
        return res
          .status(400)
          .json({error:err});
      }
      //check staff Password
      const validPass = await bcrypt.compare(req.body.password, staff.password);
      if (!validPass)
        res
          .status(400)
          .json({ error: error, message: "Invalid Staff ID or Password" });

      const token = jwt.sign({ uid: staff._id }, "procdesssenvTECRET", {
        expiresIn: "31d",
      });
      Staff.updateOne({_id:staff._id},{$set:{accessToken:token}})
     
      res.header("authToken", token).send(token);
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = router;
