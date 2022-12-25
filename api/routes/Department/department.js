const express = require("express");
const bcrypt = require("bcryptjs");
const joi = require("joi");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const Departments = require("../../Modules/Departments/department");
const verifyUser = require("../../../MiddleWares/VerifyUser")


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      name: joi.string().required(),
      startedDate: joi.string(),
      hods: joi.any(),
      description: joi.string(),
      staff: joi.any(),
    }).unknown();;

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);

    let department = await Departments.findOne({name:"req.body.name"})
    if(department) return res.status(400).json({message:"A department with this name already exist"})
    let dep = new Departments(req.body);
    dep.save()
      .then((data) => {
        res.status(200).json({ data, message: "department created" });
    })
    .catch((err) => {
        console.log("department not saved");
        res.status(400).json({ message: err, detail: "Unable to save Department" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all Departments
router
.route("/getDepartments")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
    console.log("dkdjfdjdjdjd===")
   let department = await Departments.find({})
   console.log("==department===",department)
    res.status(200).json(department)
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
.get(allowCors.corsWithOptions,verifyUser,VerifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
   let department = await Departments.findById(id);
    res.status(200).json(department)
  }catch(error){
     res.json(error)
  }
});

//update Departments data
//update user
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, verifyUser, async (req, res) => {
  try {
    const uid = req.params.id
    Departments.findByIdAndUpdate(uid,req.body, function(err, resp){
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


router
.route("/delete/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, verifyUser, async (req, res) => {
  try {
    const uid = req.params.id
    Departments.findByIdAndDelete(uid,req.body, function(err, resp){
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
