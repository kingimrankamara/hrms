const mongoose = require("mongoose");

const Subject = new mongoose.Schema({
  name: {
    type: String,
    required
  },
  startedDate: {//state or region
    type: String,
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId, ref: "staff"
  }],

  description: {
    type: String,
  },

});

module.exports=Subject;
