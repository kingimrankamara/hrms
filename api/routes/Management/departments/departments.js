const express = require("express");
const joi = require("joi");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const Departments = require("../../../Modules/Departments/department");


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      name: joi.string(),
      startedDate: joi.string(),
      staff:joi.any().allow(null,''),
      hods:joi.any().allow(null,''),
      description: joi.string().allow(null,'')
    }).unknown();

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let department = new Departments(req.body);

    department.save()
      .then((data) => {
        res.status(200).json({ data, message: "department created" });
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save department" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all department
router
.route("/getDepartments")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let department = await Departments.find().populate("staff").populate("hods")
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
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
    const id = req.params.id;
   let department = await Departments.findById(id).populate("staff").populate("hods")
   //teachers here
   res.status(200).json(department)
  }catch(error){
     res.json(error)
  }
});


//update department data
//update department
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Departments.findByIdAndUpdate(uid,req.body, function(err, resp){
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
