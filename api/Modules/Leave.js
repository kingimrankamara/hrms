const mongoose = require("mongoose");

const leave = new mongoose.Schema({
  leaveType: {
    type: String,
    required:true
  },
  startDate: {//state or region
    type: String,
  },
  endDate: {//state or region
    type: String,
  },
  requestedBy:{
    type:mongoose.Schema.Types.ObjectId, ref:'staff'
  },
  description: {
    type: String,
  },
  status:{
    type:String,
    enum:["Pending","Approved","Denied"],
    default:"Pending"
  }

});
const Leave = mongoose.model("leave", leave);
module.exports = Leave;
