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
// app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(__dirname + '/public/uploads'))


app.use('/', homeRouter);
app.use('/singleUser', singleUserRouter);
app.use('./auth', authenticationRouter);

///video
let upload = multer({ dest: __dirname + '/public/uploads/' });

app.post('/api/test', upload.single('userRecordedVideoCV'), (req, res, next) => {
  req.params.id = req.body.userId;
  req.body = {video: req.protocol + '://' + req.get('host') + '/public/uploads/'  + req.file.filename + '.webm'}
  return next()
}, 

  singleUserController.update_user
 
);



///video & documents
let fileupload = multer ({dest: __dirname + '/public/documents'});

 app.post('/fileupload', fileupload.single('profile_pic'), (req, res)=>{
   console.log(req.file)
   let image = fs.readFileSync(req.file.path);
  //  let encode_img = img.toString('utf-8');

//convert to json file
   let finalImg = {
     contentType: req.file.mimetype,
     profile_pic: `<img src="/documents/${req.file.filename}"/>`
    //  Buffer.from(encode_img, 'utf-8')
   };
   client.collection('profile_pic').insertOne(finalImg,( err, result) => {
     console.log(result)
     if (err) return console.log(err)
     console.log('saved to database')
     res.send(finalImg)
   })

  //  const template = `<img src="/documents/${req.file.filename}"/>`;
  //  res.send(image)
 })

 app.get('/', (req, res)=>{
   res.sendFile(path.join(__dirname, 'fileUpload.js'))
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
