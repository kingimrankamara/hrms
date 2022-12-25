const express = require("express");
const allowCors = require("../../../MiddleWares/AllowCors");
const router = express.Router();
const Staff = require("../../../Modules/Users/staff");
const verifyUser = require("../../../MiddleWares/VerifyUser")



//file upload and unlink
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);


var limits = {
    //files: 1, // allow only 1 file per request
    fileSize: 10 * 1000 * 10
  };
  
  const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      if (file.fieldname === "pp") {
        cb(null, "./uploads/");
      }
    },
    limits: limits,
    
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
  });
  var upload = multer({ storage: storage });
  

router.route("/upload")
.options(allowCors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
}).post(allowCors.corsWithOptions, upload.single('pp'), async (req, res) => {
  try {
    let file = req.file; 
    res.status(200).json({pp:file.path})
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
