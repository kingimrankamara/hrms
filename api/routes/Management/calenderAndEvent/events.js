const express = require("express");
const joi = require("joi");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const Events = require("../../../Modules/calenderAndEvents/event");


router.route("/create")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, async (req, res) => {
  try {
    const regSchema = joi.object({
      name: joi.string().min(3).required(),
      dueDate: joi.string(),
      amount:joi.number().required(),
      description: joi.string()
    })

    const { error, value } = regSchema.validate(req.body);
    if (error) return res.status(401).json(error);
    
    let event = new Events(req.body);

    event.save()
      .then((data) => {
        res.status(200).json({ data, message: "event created" });
    })
    .catch((err) => {
        console.log("user not saved");
        res.status(400).json({ message: err, detail: "Unable to save event" });
    });
  } catch (err) {
    console.log(err.message);
  }
});


//get all event
router
.route("/getEvemts")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
})
.get(allowCors.corsWithOptions, async (req, res) => {
  try {
   let event = await Events.find();
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
   let event = await Events.findById(id)
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
