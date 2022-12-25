const express = require("express");
const joi = require("joi");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const Bills = require("../../../Modules/billing/bills");
const Students = require("../../../Modules/Users/students");

router.route("/assign")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      bills: joi.any().required(),
      students: joi.any().required(),
    })

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    

    Students.updateMany({_id:{$in:req.body.students}},{$push:{bills:req.body.bills}})
      .then((data) => {
        res.status(200).json({ data, message: "student bill assigned"});
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to assign student bill" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all student bill
router
.route("/getStudentsBill")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let  bill = await Students.find().populate(
    {path:'bills',
      populate: [{
        path: 'bill',
        model: 'bill'
      } ]
    });
    res.status(200).json( bill)
  }catch(error){
     res.json(error)
  }
});


//get single student bill
router
.route("/get/student/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
    const id = req.params.id;
   let  studentBill = await Students.findById(id).populate(
    {path:'bills',
      populate: [{
        path: 'bill',
        model: 'bill'
      } ]
    });
   //teachers here
   res.status(200).json( studentBill)
  }catch(error){
     res.json(error)
  }
});


//receive student payment
router
.route("/payment/:sid")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    let student = await Students.findById(req.params.sid).populate(
      {path:'bills',
        populate: [{
          path: 'bill',
          model: 'bill'
        } ]
      });

      let bills=student.bills.filter(b=>{
        return b._id == req.body._id;
      });

      bills[0].paymentHistory.push({
        amp:req.body.amount,
        receivedBy:req.body.receivedBy
      });
      let balance =bills[0].bill.amount;
      bills[0].paymentHistory.forEach(pay => {
        balance = balance - pay.amp;
        console.log(balance)
      });
      bills[0].balance=balance;
      if(bills[0].balance ==0){
        bills[0].status="Paid"
      }
      else if(bills[0].balance < 0){
        bills[0].status="Refund"
      }
      else if(bills[0].balance > 0){
        bills[0].status="Deposit"
      }

      Students.updateOne({_id:student._id},{$set:{bills:bills}}).then(data=>{
        res.status(200).json(data)
      }).catch(err=>{
        res.status(400).json(err)
      });

  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error.message)
  }
});


//update student bill
router
.route("/update/:sid")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    let student = await Students.findById(req.params.sid).populate(
      {path:'bills',
        populate: [{
          path: 'bill',
          model: 'bill'
        } ]
      });

      let bills=student.bills.filter(b=>{
        return b._id == req.body._id;
      });
      
      let bill= bills[0].paymentHistory.find(bill=>{
        return bill._id == req.body.paymentId
      })
      bill.amp=req.body.amount
      
      let balance =bills[0].bill.amount;
      bills[0].paymentHistory.forEach(pay => {
        balance = balance - pay.amp;
      });
      bills[0].balance=balance;
      if(bills[0].balance ==0){
        bills[0].status="Paid"
      }
      else if(bills[0].balance < 0){
        bills[0].status="Refund"
      }
      else if(bills[0].balance > 0){
        bills[0].status="Deposit"
      }

      Students.updateOne({_id:student._id},{$set:{bills:bills}}).then(data=>{
        res.status(200).json(data)
      }).catch(err=>{
        res.status(400).json(err)
      });

  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error.message)
  }
});


//delete student bill from payment histpry
router
.route("/delete/:sid")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    let student = await Students.findById(req.params.sid).populate(
      {path:'bills',
        populate: [{
          path: 'bill',
          model: 'bill'
        } ]
      });

      let bills=student.bills.filter(b=>{
        return b._id == req.body._id;
      });
      
      let bill= bills[0].paymentHistory.find(bill=>{
        return bill._id == req.body.paymentId
      })

     bills[0].paymentHistory.remove(bill)//delete bill
      console.log(bills[0].paymentHistory)
      let balance =bills[0].bill.amount;
      bills[0].paymentHistory.forEach(pay => {
        balance = balance - pay.amp;
      });
      bills[0].balance=balance;
      if(bills[0].balance ==0){
        bills[0].status="Paid"
      }
      else if(bills[0].balance < 0){
        bills[0].status="Refund"
      }
      else if(bills[0].balance > 0){
        bills[0].status="Deposit"
      }

      Students.updateOne({_id:student._id},{$set:{bills:bills}}).then(data=>{
        res.status(200).json(data)
      }).catch(err=>{
        res.status(400).json(err)
      });

  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error.message)
  }
});
module.exports = router;
