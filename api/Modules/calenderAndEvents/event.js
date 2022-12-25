const mongoose = require("mongoose");

const event = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      unique:true
    },
    description:{
        type:String,
    },
    startDate: {
      type: Number,
      required: true,
    },
    endDate:{
      type: String,
    },
    status:{
        type:String,
        default:"Up coming",
        enum:["Past","On Going","Cancled"]
    }
     },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", event);
module.exports = Event;
