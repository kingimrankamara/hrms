const mongoose = require("mongoose");

const resetPassword =new mongoose.Schema({
  code: {
    type:String
  },
}, {timestamps: true});
module.exports=resetPassword;
