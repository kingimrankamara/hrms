const attendanceSchema = new mongoose.Schema({
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Staff',
      required: true
    },
    clockIn: {
      type: Date,
      default: Date.now,
      required: true
    },
    clockOut: {
      type: Date
    }
  });
  
  const Attendance = mongoose.model('Attendance', attendanceSchema);
  