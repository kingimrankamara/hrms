const express = require("express");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const Student = require("../../../Modules/Users/students");
const verifyUser = require("../../../MiddleWares/VerifyUser")


router.route("/")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      firstName: joi.string().min(3).required(),
      lastName: joi.string().min(3).required(),
      email: joi.string(),
      phone: joi.string(),
      yearStarted: joi.string().required(),
      staffType: joi.string().required(),
    }).unknown();;

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);

    let password ="123456789"
    const salt = await bcrypt.genSalt(10);
    const hashePasswod = await bcrypt.hash(password, salt);

    let user = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashePasswod,
    });

    user.save()
      .then((data) => {
        res.status(200).json({ data, message: "Student created" });
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save user" });
    });
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
