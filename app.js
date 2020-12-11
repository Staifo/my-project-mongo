require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Data = require ('./mockdata');
const cors = require ('cors');
const client = require('./mongoDBConnection/client');
const singleUser = require('./models/singleUser');
const multer = require('multer');
const fs = require('fs');
const singleUserController = require('./controllers/singleUserController')
const videoUpload = require('./utils/fileUploader')
const picUpload = require('./utils/picUploader')



var homeRouter = require('./routes/home');
var singleUserRouter = require('./routes/singleUser');
const authenticationRouter = require('./routes/authentication');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'))


app.use('/', homeRouter);
app.use('/singleUser', singleUserRouter);
app.use('./auth', authenticationRouter);


//video
app.post('/videoUpload', videoUpload.single('userRecordedVideoCV'), async (req, res, next) => {
  const {file, fileValidationError} = req
  if (!file) {
    return res.status(400).send('Please upload a file'); // 400 Bad Request
  }
  if (fileValidationError) {
    return res.status(400).send(fileValidationError);
  }
  // console.log(file)

  const updatedUser = await singleUser.findByIdAndUpdate(req.body.userId, {video: req.file.filename}, { new: true })

  res.send(updatedUser);
});

 app.post('/fileupload', picUpload.single('userFile'), async (req, res)=>{
  const {file, fileValidationError} = req
  if (!file) {
    return res.status(400).send('Please upload a file'); // 400 Bad Request
  }
  if (fileValidationError) {
    return res.status(400).send(fileValidationError);
  }
  console.log(file)

  // video / profile_pic / CV
  console.log({userId: req.body.userId})
  console.log({type: req.body.type})

  const updatedUser = await singleUser.findByIdAndUpdate(req.body.userId, {[req.body.type]: req.file.filename}, { new: true })

  res.send(updatedUser);

  //  const updatePic = await singleUser.findByIdAndUpdate(req.body.userId, {profile_pic: req.file.filename}, {new: true})
  //    if (err) return console.log(err)
  //    console.log('saved to database')
  //    res.send(updatePic)
   })
 

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
