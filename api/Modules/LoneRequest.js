const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    requestedBy:{
    type:mongoose.Schema.Types.ObjectId, ref:'staff'
    },
    amount: { type: Number, required: true },
    message: { type: String, required: true },
},{
    timestamps: true,
});

module.exports = mongoose.model('Loan', loanSchema);