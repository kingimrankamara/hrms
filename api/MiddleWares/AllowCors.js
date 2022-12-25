const cors = require("cors");

const whitelist = [
  "http://localhost:8080", 
  "http://localhost:3000",
  "http://localhost:57149", 
  "https://admin.marksclothingsl.com",
];
var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
