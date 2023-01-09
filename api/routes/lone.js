const express = require("express");
const Joi = require("joi");
const allowCors = require("../MiddleWares/AllowCors");
const router = express.Router();
const Lone = require("../Modules/Lone");


router.route("/give")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
   

    const loanSchema = Joi.object({
        employeeId: Joi.object().required(),
        amount: Joi.number().required(),
        terms: Joi.string().required(),
        isPaid: Joi.boolean().default(false),
        paymentDueDate: Joi.date().required(),
        paymentAmount: Joi.number().required()
      }).unknown();

    const { error, value } = loanSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let lone = new Lone(req.body);

    lone.save()
      .then((data) => {
        res.status(200).json( data);
    })
    .catch((err) => {
        console.log("Lone not saved");
        res.status(400).json({ message: err, detail: "Unable to save lone" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all lone
router
.route("/getlones")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let lone = await Lone.find().populate('employeeId');
    res.status(200).json(lone)
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
   let lone = await Lone.findById(id).populate("employeeId")
   //teachers here
   res.status(200).json(lone)
  }catch(error){
     res.json(error)
  }
});


//update lone data
//update lone
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Lone.findByIdAndUpdate(uid,req.body, function(err, resp){
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

module.exports = router;
