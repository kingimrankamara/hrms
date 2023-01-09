const express = require("express");
const Joi = require("joi");
const allowCors = require("../MiddleWares/AllowCors");
const router = express.Router();
const LoneRequest = require("../Modules/LoneRequest");


router.route("/request")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
   

    const loanSchema = Joi.object({
        requestedBy: Joi.object().required(),
        amount: Joi.number().required(),
        message: Joi.string().required(),
      });

    const { error, value } = loanSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let loneRequest = new LoneRequest(req.body);

    loneRequest.save()
      .then((data) => {
        res.status(200).json( data);
    })
    .catch((err) => {
        console.log("LoneRequest not saved");
        res.status(400).json({ message: err, detail: "Unable to save LoneRequest" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all LoneRequest
router
.route("/getLoneRequests")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let loneRequest = await LoneRequest.find().populate('employeeId');
    res.status(200).json(loneRequest)
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
   let loneRequest = await LoneRequest.findById(id).populate("employeeId")
   //teachers here
   res.status(200).json(loneRequest)
  }catch(error){
     res.json(error)
  }
});


//update LoneRequest data
//update LoneRequest
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    LoneRequest.findByIdAndUpdate(uid,req.body, function(err, resp){
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
