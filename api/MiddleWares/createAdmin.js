/////////////////////////////////////////////////////////
////-----------A---------------
////-----------D---------------
////-----------M---------------
////-----------I---------------
////-----------N---------------
////////////////////////////////////////////////////////////////


//creat admin on first startup===============================
const bcrypt = require("bcryptjs");
const UserModal= require("../Modules/Users/staff");

module.exports = async function creatSuperUser(){
  let user= await UserModal.find({})
  if(user.length==0){
  
    const salt = await bcrypt.genSalt(10);
    const hashePasswod = await bcrypt.hash("admin1234", salt);

    let u = new UserModal({
      email:"gs@goldentsoftware.com",
      password:hashePasswod,
      firstName:"Default",
      staffId:"12345678",
      lastName:"Admin",
      dateStarted: new Date(),
      dob: new Date(),
      role:"Admin",
    });

    u
      .save()
      .then((data) => {
        console.log( data,"user created" );
      })
      .catch((err) => {
        console.log(err)
      })
  }
}