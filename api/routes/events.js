const express = require("express");
const Joi = require("joi");
const allowCors = require("../MiddleWares/AllowCors");
const router = express.Router();
const Events = require("../Modules/event");


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    
    const eventSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      startTime: Joi.date().required(),
      endTime: Joi.date().required(),
      color: Joi.string(),
      attendance: Joi.string().valid('optional', 'compulsory'),
      location: Joi.object({
        address: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        zip: Joi.string()
      })
    });

    const { error, value } = eventSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let event = new Events(req.body);

    event.save()
      .then((data) => {
        res.status(200).json( data);
    })
    .catch((err) => {
        res.status(400).json({ message: err, detail: "Unable to save event" });
    });
  } catch (err) {
    console.log(err.message);
    res.json(err.message)
  }
});


//get all event
router
.route("/getSubjects")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let event = await Events.find().populate('teachers');
    res.status(200).json(event)
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
   let event = await Events.findById(id).populate("teachers")
   //teachers here
   res.status(200).json(event)
  }catch(error){
     res.json(error)
  }
});


//update event data
//update event
router
.route("/update/:id")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const uid = req.params.id
    Events.findByIdAndUpdate(uid,req.body, function(err, resp){
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
