const mongoose = require("mongoose");


const Period =  mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    start:{
        type:String,
    },
    end:{
        type:String,
    }
});

const Day =  mongoose.Schema({
    day:{
        type:String,
        required:true
    },
    periods:[Period]
});

const weeks =  mongoose.Schema({
    week:{
        type:String,
        required:true
    },
    days:[Day]
});

const timetabla = new mongoose.Schema(
  {
    academicYear:{
      type:String,
      required:true,
    },
    tearm:{
        type:String,
        required:true
    },
    grade:{
        type:mongoose.Schema.Types.ObjectId, ref:'level'
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId, ref:'subject'
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId, ref:'staff'
    },
    weeks:[weeks]
     },
  {
    timestamps: true,
  }
);

const Timetable = mongoose.model("timetabla", timetabla);
module.exports = Timetable;
