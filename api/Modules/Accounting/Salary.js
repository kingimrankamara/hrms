//Salary payment records


const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const salary = new Schema({
    name:{
        type:String,
        required:true
    },
    paidBy: { 
        type: mongoose.Schema.Types.ObjectId, ref: "staff"
    },
    paindTo:{ 
        type: mongoose.Schema.Types.ObjectId, ref: "staff"
    },
    amount:{ 
        type: Number,
        required:true,
    },
},{
    timestamps: true,
  });
const Salary = mongoose.model("salary", salary);
module.exports = Salary;

