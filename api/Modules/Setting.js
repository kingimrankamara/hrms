
const mongoose = require("mongoose");
const Address = require("./schemas/Address");
const Schema = require("mongoose").Schema;

const grade = new Schema({
    Name: { 
        type: Number,
        required:true,
    },
    foundedSDate:{
        type:String,
        required:true
    },
    logo:{
        type:String,
    },
    levels:{
        type:String,
        default: "Junior-Senior Secondary",
        enum:["Primary","Junior Secondary","Senior Secondary",
        "Primary-Junior Secondary",
        "Primary-Senior Secondary","Junior-Senior Secondary"]
    },
    address:Address,
    description:{
        type:String,
    }
},{
    timestamps: true,
  });
const Grade = mongoose.model("grade", grade);
module.exports = Grade;

