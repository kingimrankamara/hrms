
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const department = new Schema({
    name: { 
        type: String,
        required:true,
    },
    description:{
        type: String, 
    },
    hods: [{
        type:mongoose.Schema.Types.ObjectId, ref:'staff'
    }],
    staff: [{
        type:mongoose.Schema.Types.ObjectId, ref:'staff'
    }],
},{
    timestamps: true,
  });
const Department = mongoose.model("department", department);
module.exports = Department;

