const express = require("express");
const joi = require("joi");
const allowCors = require("../../MiddleWares/AllowCors");
const router = express.Router();
const Programs = require("../../Modules/programs");


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      name: joi.string().required(),
      levels:joi.any().required(),
      description:joi.string(),
      startedDate:joi.string()
    })

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let program = new Programs(req.body) ;

    program.save()
      .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save program" });
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.route("/createmany")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
   
    Programs.insertMany(req.body)
      .then((data) => {
        res.status(200).json({ data, message: "programs created"});
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save programs"});
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all program
router
.route("/getprograms")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let program = await Programs.find().populate({path:"levels"})
    res.status(200).json(program)
  }catch(error){
     res.json(error)
  }
});


//get student  grades
router
.route("/get/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
    const id = req.params.id;
   let program = await Programs.find({gradeFor:id});
    res.status(200).json(program)
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
   let program = await Programs.findById(id);
   res.status(200).json(program)
  }catch(error){
     res.json(error)
  }
});


//update program data
//update program
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Programs.findByIdAndUpdate({_id:uid},{$set: req.body}, function(err, resp){
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
