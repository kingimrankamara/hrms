const mongoose = require("mongoose");

const company = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  motto: {//state or region
    type: String,
  },
  foundedDate: {//state or region
    type: String,
  },
  md:{
    type:mongoose.Schema.Types.ObjectId, ref:'staff'
  },
  description: {
    type: String,
  },
  logo:{
    type:String,
    required:true
  }

});
const Company = mongoose.model("company", company);
module.exports = Company;
