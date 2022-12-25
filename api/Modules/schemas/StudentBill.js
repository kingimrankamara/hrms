const mongoose = require("mongoose");

const PaymentHistory = new mongoose.Schema({
    amp: {
      type: Number,
      required:true
    },
    receivedBy: {
      type: mongoose.Schema.Types.ObjectId, ref: "staff"
    },
},{
    timestamps: true,
  });

const Bills = new mongoose.Schema({
  bill: {
    type: mongoose.Schema.Types.ObjectId, ref: "bill"
  },
  balance: {
    type: Number,
  },
  paymentHistory:[PaymentHistory],
  status:{
    type:String,
    default:"Un Paid",
    enum:["Un Paid","Paid","Deposit","Sch","Refund"]
  }
});

module.exports=Bills;
