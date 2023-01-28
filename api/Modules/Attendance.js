const mongoose = require("mongoose");


const attendanceSchema = new mongoose.Schema({
    staffId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true
    },
    clockIn: {
      type: Date,
      default: new Date(),
      required: true
    },
    clockOut: {
      type: Date
    }
  });
  
  const Attendance = mongoose.model('Attendance', attendanceSchema);
  module.exports = Attendance;
