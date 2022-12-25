const express = require("express");
const joi = require("joi");
const allowCors = require("../../MiddleWares/AllowCors");
const router = express.Router();
const Company = require("../../Modules/company");


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      name: joi.string().required(),
      logo: joi.string().required(),
    }).unknown();

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let company = new Company(req.body);

    company.save()
      .then((data) => {
        res.status(200).json({ data, message: "company created" });
    })
    .catch((err) => {
        console.log("not saved");
        res.status(400).json({ message: err, detail: "Unable to save company" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all company
router
.route("/getCompany")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let company = await Company.find().populate("md")
    res.status(200).json(company)
  }catch(error){
     res.json(error)
  }
});



//update company
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Company.findByIdAndUpdate(uid,req.body, function(err, resp){
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
    Company.findByIdAndDelete(uid,req.body, function(err, resp){
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
