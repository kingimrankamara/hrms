const express = require("express");
const joi = require("joi");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const TimeTable = require("../../../Modules/calenderAndEvents/timeTable");


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      academicYear: joi.string().min(3).required(),
      weeks: joi.any().required(),
      tearm: joi.string().required(),
      grade:joi.any().required(),
      teacher:joi.any().required(),
      subject: joi.any().required()
    })

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let timetable = new TimeTable(req.body);

    timetable.save()
      .then((data) => {
        res.status(200).json({ data, message: "timetable created" });
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save timetable" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all timetable
router
.route("/getTimetable")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let timetable = await TimeTable.find().populate({path:"subject"})
   .populate({path:"grade"}).populate({path:"teacher"})
    res.status(200).json(timetable)
  }catch(error){
     res.json(error)
  }
});


//get single department
router
.route("/get/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
    const id = req.params.id;
   let timetable = await TimeTable.findById(id)
   //teachers here
   res.status(200).json(timetable)
  }catch(error){
     res.json(error)
  }
});


//update timetable data
//update timetable
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    TimeTable.findByIdAndUpdate(uid,req.body, function(err, resp){
      if(err){
        res.json(err.message);
      }
      res.json(resp);
    })
  }catch(error){
     error = {message:"Internal Server Error"}
     res.json(error.message)
  }
});

module.exports = router;
