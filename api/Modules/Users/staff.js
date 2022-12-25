const mongoose = require("mongoose");
const ResetPassword = require('../schemas/ResetPassword')
const UserRoles =["Staff", "Admin"];



const Trainings=new mongoose.Schema({
  status:{
    type:String,
      default:"Active",
      enum:["Active","Expelled","Changed","Completed"]
  },
  program:{ 
    type:mongoose.Schema.Types.ObjectId, ref:'program',
    required:true
  }
})


const deleteData =new mongoose.Schema({
  requested:{
    type: Boolean,
    default:false
  },

  requestedBy:{
    type:mongoose.Schema.Types.ObjectId, ref:'staff'
  }
},{
    timestamps: true,
});


const staff = new mongoose.Schema(
  {
    staffId:{
      type: String,
      required: true,
      unique:true
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName:{
        type: String,
    },
    lastName:{
      type: String,
    },
    dob: {
      type: String,
      required:true
    },
    grade:{
      type: Number,
    },
    email: {
      type: String,
    },
    phone: {
        type: String,
    },
    password: {
      type: String,
      required: true,
    },
    pp: {//profile picture
      type: String,
    },
    class: {
        type: String,
    },
    dateStarted: {
        type: String,
    },
    deleteData:deleteData,
    gender:{
        type: String,
    },
    bloodGroup:{
      type:String,
    },
    experience:{
      type: Number,
    },
    role: {
      type: String,
      default: "Staff",
      enum: UserRoles
    },
    jobTitle: {
      type: String,
    },
    department:{
      type:mongoose.Schema.Types.ObjectId, ref:'department'
    },
    employmentType: {
      type: String,
      default: "Permanent",
      enum: ["Permanent","Temporal", "Contract", "Substitute"],
    },
    trainings:[Trainings],
    social:{
      type: String,
    },
    allowance:{
      type:Number,
    },
    salary:{
      type:Number,
    }, 
    accessToken: {
      type: String,
    },
    bio: {
      type: String,
    },
    resetPassword:ResetPassword,
    emergencyContact:[],
    address:{
      type:String,
    },
  },
  {
    timestamps: true,
  }
);

const Staff = mongoose.model("staff", staff);
module.exports = Staff;
