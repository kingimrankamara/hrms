const express = require("express");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const User = require("../../../Modules/User");
const verifyUser = require("../../../MiddleWares/VerifyUser")
const verifyAdmin = require("../../../MiddleWares/access/VerifyAdmin")


router.route("/")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions,verifyUser,verifyAdmin, async (req, res) => {
  try {
    const regSchema = joi.object({
      firstName: joi.string().min(3).required(),
      lastName: joi.string().min(3).required(),
      email: joi.string().required(),
      password: joi.string().min(8).required(),
      rePassword: joi.ref("password"),
    });

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);

    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail)
      return res
        .status(401)
        .json({ message: "A user with this Email exist" });
    
    const salt = await bcrypt.genSalt(10);
    const hashePasswod = await bcrypt.hash(req.body.password, salt);

    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashePasswod,
      role:"admin"
    });

    user
      .save()
      .then((data) => {
        res.status(200).json({ data, message: "user created" });
      })
      .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save user" });
      });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
