const express = require("express");
const joi = require("joi");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const Invoice = require("../../../Modules/billing/invoice");


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      name: joi.string().min(3).required(),
      dueDate: joi.string(),
      amount:joi.number().required(),
      description: joi.string()
    })

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let invoice = new Invoice(req.body);

    invoice.save()
      .then((data) => {
        res.status(200).json({ data, message: "invoice created" });
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save invoice" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all invoice
router
.route("/getInvoices")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let invoice = await Invoice.find();
    res.status(200).json(invoice)
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
   let invoice = await Invoice.findById(id)
   //teachers here
   res.status(200).json(invoice)
  }catch(error){
     res.json(error)
  }
});


//update invoice data
//update invoice
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Invoice.findByIdAndUpdate(uid,req.body, function(err, resp){
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
