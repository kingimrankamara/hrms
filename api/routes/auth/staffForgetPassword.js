
const express = require("express");
const router = express.Router();

const allowCors = require("../../MiddleWares/AllowCors");
const joi = require("joi");
const Staff = require("../../Modules/Users/staff");
const mailSender =require("../../MiddleWares/sendMail");

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
  mailSender(payloadData);//nodemailer middleware
  
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

module.exports = router;