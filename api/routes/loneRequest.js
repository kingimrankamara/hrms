const express = require("express");
const Joi = require("joi");
const allowCors = require("../MiddleWares/AllowCors");
const router = express.Router();
const LoneRequest = require("../Modules/Lone");
const VerifyUser =require("../MiddleWares/VerifyUser")

router.route("/request")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions,VerifyUser, async (req, res) => {
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
.route("/getOwnLoneRequestss")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions,VerifyUser, async (req, res) => {
  try {
   const uid = req.user.uid;
   let loneRequest = await LoneRequest.find({requestedBy:uid});
    res.status(200).json(loneRequest)
  }catch(error){
     res.json(error)
  }
});


//get single department
router
.route("/getOwne/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions,VerifyUser, async (req, res) => {
  try {
    const uid = req.user.uid;
    const id = req.params.id;
    let lone = await LoneRequest.findById(id);
   
   if (loan.staffId.toString() !== uid) {
      return res.status(401).json({ message: 'Not authorized' });
   }
   res.status(200).json(lone)
  }catch(error){
     res.json(error)
  }
});


//update LoneRequest data
//update LoneRequest
router
.route("/updateOwne/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions,VerifyUser, async (req, res) => {
  try {
    const uid = req.params.id;
    const loan = await LoneRequest.findById(id);
    if (loan.staffId.toString() !== uid) {
      return res.status(401).json({ message: 'Not authorized'});
   }
    lone.set(req.body);
    await lone.save();
    res.json(lone);

  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error.message)
  }
});

module.exports = router;
