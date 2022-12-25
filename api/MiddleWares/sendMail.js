var nodemailer =require('nodemailer');


module.exports=async function sendMail(payload){
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: '"Sender Name " sender@example.com', // sender address
        to: payload.to, // list of receivers
        subject: payload.subject, 
        text: payload.content, 
        html: payload.content, // html body
      });
  console.log(info);
}