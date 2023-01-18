
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const allowCors = require("../../MiddleWares/AllowCors");
const joi = require("joi");
const Staff = require("../../Modules/Users/staff");
const mailSender =require("../../MiddleWares/sendMail");
const VerifyUser =require("../../MiddleWares/VerifyUser")
router
  .route("/")
  .options(allowCors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(allowCors.corsWithOptions, async (req, res) => {
  try{
  const emailSchem =joi.object({
      staffId:joi.string()
  });
  const {error} = emailSchem.validate(req.body)
  if (error) res.status(401).json({error:error, message:'invalid email'})

  //chek if user exist
  const user = await Staff.findOne({staffId:req.body.staffId})
  if (!user) return res.status(401).json({error:error, message:'Invalid email'})
  //generat verifecation code
  const resetCode = Math.floor(1000 + Math.random() * 9000);
  let payloadData={
      to:user.email,
      subject:"Reset Password",
      content:"Hi we received a request to reset your password, please use this code to reset your password "+resetCode
  }
   console.log(payloadData)
   //mailSender(payloadData);//nodemailer middleware
  
   user.resetPassword = {
      code:resetCode
    }
   user.save().then(()=>{
     
   }).catch(err=()=>{
      console.log('unable to send email')
      res.status(400).send(err);
   })
   res.status(200).json(user.email);
}catch(err){
  console.log(err);
}
})


router
  .route("/verifyCode")
  .options(allowCors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(allowCors.corsWithOptions, async (req, res) => {
  try{
  const codeSchema =joi.object({
      code:joi.string().required(),
      staffId:joi.string().required(),
  });
  const {error} = codeSchema.validate(req.body)
  if (error) res.status(401).json({error:error, message:'Invalid verification code'})

  //chek if user exist
  const staff = await Staff.findOne({staffId:req.body.staffId})
  if (!staff) return res.status(401).json({error:error, message:'Errr: User not found'})

  //verify code
  let code = staff.resetPassword.code
  if(code !== req.body.code) return res.json(400).json({message:'Invalid verification code'});

  //generate token
  const token = jwt.sign({ uid: staff._id }, "procdesssenvTECRET", {
    expiresIn: "420s",//7 minute 
  });
   res.status(200).json(token)
  
   
}catch(err){
  console.log(err.message);
}
})



router
  .route("/newPassword")
  .options(allowCors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(allowCors.corsWithOptions,VerifyUser, async (req, res) => {
  try{
  const codeSchema =joi.object({
      password:joi.string().required(),
      rePassword:joi.string().required(),
  });
  const {error} = codeSchema.validate(req.body)
  if (error) res.status(401).json({error:error, message:'Invalid verification code'})

  //chek if user exist
  const uid = req.user.uid
  const salt = await bcrypt.genSalt(10);
  const hashePasswod = await bcrypt.hash(req.body.password, salt);
  let staff = await Staff.findByIdAndUpdate(uid,{password:hashePasswod})
  if(!staff) return res.status(400).json({message:'User not found'})
  
   res.status(200).json("Done: Passworrd updated")
  
}catch(err){
  console.log(err.message);
}
})

module.exports = router;