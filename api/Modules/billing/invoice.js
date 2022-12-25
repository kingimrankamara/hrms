const mongoose = require("mongoose");

const invoice = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      unique:true
    },
    description:{
        type:String,
    },
    amount: {
      type: Number,
      required: true,
    },
    dueDate:{
      type: String,
    },
    status:{
        type:String,
        default:"Unpaid",
        enum:["Paid","Unpaid","Overdue","Cancled"]
    }
     },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("invoice", invoice);
module.exports = Invoice;
