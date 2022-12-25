const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const allowCors = require("../../MiddleWares/AllowCors");
const User = require("../../Modules/User");


//login
router
  .route("/")
  .options(allowCors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(allowCors.corsWithOptions, async (req, res) => {
    try {
      const regSchema = joi.object({
        password: joi.string().min(7).required(),
        email: joi.string().max(100).email({ tlds: { allow: false } })
      });
      const { error } = regSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          error: error,
          message: "Please enter a valid email and password",
        });

      //check db for user by user email
      const user = await User.findOne({ email: req.body.email });
      if (!user){
     let err={
        message:"Invalid Phone email"
      }
        return res
          .status(400)
          .json({error:err});
      }
      //check user Password
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass)
        res
          .status(400)
          .json({ error: error, message: "Invalid Email address or Password" });

      const token = jwt.sign({ uid: user._id }, "procdesssenvTECRET", {
        expiresIn: "31d",
      });
      user.accessToken = token
      user.save().catch(error=>{
        console.log("Token Not save",error)
      })
      res.header("authToken", token).send(token);
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = router;
