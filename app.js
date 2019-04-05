var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoRouter = require('./routes/mongoRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/mongo', mongoRouter);
app.use('/users', usersRouter);
var mongoClient = require('mongodb').MongoClient;  //MongoDB driver


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

     var server = "mongodb://localhost:27017";

    mongoClient.connect(server, function(error, client) {
    if(error)
    console.log("Error while connecting to database: ", error);
    else
    console.log("Connection established successfully");
    var db = client.db('db_school');

    //perform operations here
    var subject = {
      id : 1,
      title : " Data Structures",
      duration : "120h",
      content : [
          "Lists",
          "Trees",
          "Graphs"
      ]
  };
    var filter={id:1};
  db.collection("subjects").insertOne(filter,subject, function(error, result){
      if(error)
          console.log("Error: ", error);
      else
      console.log("Document inserted.");
  });


    client.close();
 });
// Connect to the db


module.exports = app;
