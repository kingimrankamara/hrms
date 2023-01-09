const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  color: { type: String },
  attendance: { type: String, enum: ['optional', 'compulsory'] },
  location: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  }
},{
    timestamps: true,
});

module.exports = mongoose.model('Event', eventSchema);