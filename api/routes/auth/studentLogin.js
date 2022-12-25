const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const allowCors = require("../../MiddleWares/AllowCors");
const Students = require("../../Modules/Users/students");


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
        studentId: joi.string().max(15).required()
      });
      const { error } = regSchema.validate(req.body);
      if (error)
        return res.status(400).json({
          error: error,
          message: "Please enter a valid Student ID and password",
        });

      //check db for student by student email
      const student = await Students.findOne({ studentId: req.body.studentId });
      if (!student){
     let err={
        message:"Invalid Student ID"
      }
        return res
          .status(400)
          .json({error:err});
      }
      //check student Password
      const validPass = await bcrypt.compare(req.body.password, student.password);
      if (!validPass)
        res
          .status(400)
          .json({ error: error, message: "Invalid Student ID or Password" });

      const token = jwt.sign({ uid: student._id }, "procdesssenvTECRET", {
        expiresIn: "31d",
      });
      student.accessToken = token
      student.save().catch(error=>{
        console.log("Token Not save",error)
      })
      res.header("authToken", token).send(token);
    } catch (err) {
      console.log(err);
    }
  });

  module.exports = router;
