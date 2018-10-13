/* Author: santhosh Bonala */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
var index = require('./routes/index');
var users = require('./routes/users');
var db = require('./config/database');
var app = express();
var adminRoutes = require('./modules/admin/admin.route')
var audienceRoutes = require('./modules/audience/audience.route')
var jwt = require('jsonwebtoken')
var config = require('./config/config')
var session = require('express-session')
var mongoose = require('mongoose')
var adminModel = require('./models/Admin.model')
var cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'frontend'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  secret: config.sessionsecret,
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: true }
}))
// app.use('/', index);
app.use('/users', users);
app.use('/register', audienceRoutes);

let tokenAuthentication = (req, res, next) => {
  if (req.headers.token || req.query.token) {
    try {
      jwt.verify(req.headers.token || req.query.token, config.tokensecret)
      next()
    } catch (err) {
      res.status(401).send("Unauthorized")
    }
  } else {
    if (req.body.Username && req.body.Password) {
      adminModel.findOne({ Username: req.body.Username }, function (err, user) {
        if (err) res.status(401).send("Error while getting user");
            if(!user){
               return res.status(401).send('User Does not exist')
            }
            user.comparePassword(req.body.Password, function (err, isMatch) {
              if (err) res.status(400).send("Error while comparing password"); 
              if(isMatch) {
                      var data = {
                        Username: req.body.Username,
                        Password: req.body.Password
                      }
                      var token = jwt.sign(data, config.tokensecret, { expiresIn: '1h' })
                      req.session.token = token
                      next()
                  }else{
                      return res.status(401).send("Authentication Failed")
                  }  
               
             })
      })
    } else {
      res.status(401).send("Unauthorized")
    }
  }
}

app.use('/admin', tokenAuthentication, adminRoutes);

app.use('/user', audienceRoutes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(404, 'no route configured')
});

module.exports = app;
