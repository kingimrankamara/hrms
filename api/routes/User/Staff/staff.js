const express = require("express");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const Staff = require("../../../Modules/Users/staff");
const verifyUser = require("../../../MiddleWares/VerifyUser")
const GenerateId =require("../../../MiddleWares/idgenerator")

router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions,GenerateId, async (req, res) => {
  try {
    const regSchema = joi.object({
      firstName: joi.string().min(3).required(),
      lastName: joi.string().min(3).required(),
      email: joi.string(),
      phone: joi.string(),
      dateStarted: joi.string().required(),
      employmentType: joi.string().required(),
      role:joi.string().required(),
      emergencyContact:joi.any().required(),
      gender:joi.string().required(),
      password:joi.string().required(),
      grade:joi.any().required(),
    }).unknown();

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);

    const salt = await bcrypt.genSalt(10);
    const hashePasswod = await bcrypt.hash(req.body.password, salt);
    req.body.password=hashePasswod;
    req.body.staffId = req.uuid;
    let staff = new Staff(req.body);

    staff.save()
      .then((data) => {
        res.status(200).json({ data, message: "staff created" });
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save staff" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all staff
router
.route("/getStaff")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   
   let staff = await Staff.find({}).populate(
    {
      path:'department',
       model: 'department'
    });
    res.status(200).json(staff)
  }catch(error){
     res.json(error)
  }
});


//get single department
router
.route("/get/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
    const id = req.params.id;
   let staff = await Staff.findById(id).populate(
    {
      path:'department',
       model: 'department'
    });
   res.status(200).json(staff)
  }catch(error){
     res.json(error)
  }
});


//update staff data
//update staff
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Staff.findByIdAndUpdate(uid,req.body, function(err, resp){
      if(err){
        res.json(err.message);
      }
      res.json(resp);
    })
  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error.message)
  }
});


router
.route("/delete/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Staff.findByIdAndDelete(uid,req.body, function(err, resp){
      if(err){
        res.json(err);
      }
      res.json(resp);
    })
  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error)
  }
});

module.exports = router;
