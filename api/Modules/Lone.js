const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  requestedBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: true
    },
  amount: {
      type: Number,
      required: true
  },
  message: {
      type: String,
      required: true
  },
  status: {
      type: String,
      default: 'pending'
  },
  dateApplied: {
      type: Date,
      default: Date.now
  },
  dateApproved: Date,
  dateRepaid: Date,
  repaymentAmount: Number,
  createdAt: {
      type: Date,
      default: Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  }
},{
    timestamps: true,
});

module.exports = mongoose.model('Loan', loanSchema);