var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//server ----------------------------
const mongoose = require("mongoose");
require("dotenv").config();

//modules----------------------------
const CreateFirstAdmin=require("./MiddleWares/createAdmin");

var companySetup = require('./routes/Management/company');


var staffCRUD = require('./routes/User/Staff/staff');
var ppUpload = require('./routes/User/Staff/ppUpload');

var Trainings = require('./routes/trainings');
var departmentsCRUD = require('./routes/Management/departments/departments');
var leaveCRUD = require('./routes/Management/Leave');


//auth
var staffLogin = require('./routes/auth/staffLogin');
var verifyStaff = require('./routes/User/verify/staff');


//calender events and time table
var event = require('./routes/Management/calenderAndEvent/events');


//create admin on first startup
CreateFirstAdmin();

var port = 5000;
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 

app.listen(port, function () {
  console.log("app started");
});
//public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/coverImages',express.static(path.join(__dirname, 'uploads')));

app.use('/testupload',express.static(path.join(__dirname, 'uploads')));
app.use('/testupload/coverImages',express.static(path.join(__dirname, 'uploads')));

app.use("/api/company/",companySetup);

app.use("/api/staff/",staffCRUD);
app.use("/api/trainings/",Trainings);
app.use("/api/department/",departmentsCRUD);

app.use("/api/leave/",leaveCRUD);


app.use("/api/pp/",ppUpload);


app.use("/api/event/",event);



//auth
app.use("/api/auth/staff/",staffLogin);

app.use("/api/staff/verify",verifyStaff);



mongoose
  .connect(
    "mongodb://localhost/edutech",
    { useNewUrlParser: true, useUnifiedTopology: true }
    //
  )
  .then(() => {
    console.log("contented to db");
  })
  .catch((err) => {
    console.log(err);
  });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
