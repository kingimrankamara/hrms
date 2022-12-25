const mongoose = require("mongoose");

const training = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  startedDate: {//state or region
    type: String,
  },
  endingDate: {//state or region
    type: String,
  },

  description: {
    type: String,
  },

});
const Training = mongoose.model("training", training);
module.exports = Training;
