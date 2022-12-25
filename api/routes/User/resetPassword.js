
const express = require("express");
const router = express.Router();

const allowCors = require("../../MiddleWares/AllowCors");
const joi = require("joi");
const User = require("../../Modules/User");
const mailSender =require("../../MiddleWares/sendMail");

router
  .route("/")
  .options(allowCors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .post(allowCors.corsWithOptions, async (req, res) => {
  try{
  const emailSchem =joi.object({
      email:joi.string().required().email()
  });
  const {error} = emailSchem.validate(req.body)
  if (error) res.status(401).json({error:error, message:'invalid email'})

  //chek if user exist
  const user = await User.findOne({email:req.body.email})
  if (!user) return res.status(401).json({error:error, message:'Invalid email'})
  //generat verifecation code
  const resetCode = Math.floor(1000 + Math.random() * 9000);
  let payloadData={
      to:req.body.email,
      subject:"Reset Password",
      content:"Hi we required a request to reset your password, please use this code to reset your password "+resetCode
  }
  mailSender(payloadData);//nodemailer middleware
  
   user.resetPassword = {
      code:resetCode
    }
  user.save().then(()=>{
     
  }).catch(err=()=>{
      console.log('unable to send email')
      res.status(400).send(err);
  })
  res.send('resetCode');
}catch(err){
  console.log(err);
}
})

module.exports = router;