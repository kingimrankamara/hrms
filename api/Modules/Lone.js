const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  employeeId: { 
    type: String, required: true 
    },
  amount: { type: Number, required: true },
  terms: { type: String, required: true },
  isPaid: { type: Boolean, default: false },
  paymentDueDate: { type: Date, required: true },
  paymentAmount: { type: Number, required: true }
},{
    timestamps: true,
});

module.exports = mongoose.model('Loan', loanSchema);