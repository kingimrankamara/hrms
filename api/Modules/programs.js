
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const program = new Schema({
    name: { 
        type: String,
        required:true,
    },
    levels:[ {
        type:mongoose.Schema.Types.ObjectId, ref:'level',
        required:true
    }],
    startedDate:{ 
        type: String,
    },
    description:{ 
        type: String,
    },
},{
    timestamps: true,
  });
const Program = mongoose.model("program", program);
module.exports = Program;

