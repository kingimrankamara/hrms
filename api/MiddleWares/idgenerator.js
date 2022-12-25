const Staff = require('../Modules/Users/staff')

module.exports = async function idGenerator(req,res,next){
    let d=new Date(req.body.dateStarted)
    let year = d.getFullYear();
    year =year.toString();
    let staff= await Staff.find({yearStarted:year})
    let y=year.slice(-2);
    let index = staff.length + 1;
    let schoolNumber="2468" 
    let uuid=y+schoolNumber+index;
    req.uuid= uuid;
    next();
}