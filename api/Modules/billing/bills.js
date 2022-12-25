const mongoose = require("mongoose");

const bill = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true
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
   
     },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("bill", bill);
module.exports = Bill;
