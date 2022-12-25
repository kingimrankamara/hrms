const mongoose = require("mongoose");

const Address = new mongoose.Schema({
  city: {
    type: String,
  },
  region: {//state or region
    type: String,
  },
  address: {
    type: String,
  },
  
  country: {
    type: String,
  },

});

module.exports=Address;
