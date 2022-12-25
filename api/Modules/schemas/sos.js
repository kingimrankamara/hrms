const mongoose = require("mongoose");
const Address = require("./Address");
const sos = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {//state or region
    type: String,
  },
  email: {
    type: String,
  },
  address:{
    type: String,
  },
  relationship: {
    type: String,
  },

});

module.exports=sos;
