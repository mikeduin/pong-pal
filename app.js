var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var knex = require('./db/knex.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
require('dotenv').load();

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'session',
  keys: [process.env.SESSION_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

passport.use('facebook', new FacebookStrategy({
    clientID : process.env.FB_APP_ID,
    clientSecret : process.env.FB_APP_SECRET,
    callbackURL : 'http://localhost:3000/login/facebook/callback',
    profileFields: ['id', 'email', 'displayName', 'photos', 'first_name', 'last_name', 'hometown', 'link']
  },

  function(accessToken, refreshToken, profile, done) {
    var email = profile.emails[0].value;
    var username = email.split('@')[0];
    knex('users').first().where('email', email).then(function(user){
      if (!user) {
        knex('users').insert({
          email: email,
          username: username,
          first_name: profile._json.first_name,
          last_name: profile._json.last_name,
          hometown: profile._json.hometown.name,
          fb_profile: profile._json.link,
          facebookId: profile.id,
          photo: profile.photos[0].value,
          superuser: false
        }, '*').then(function(user){

          user[0].token = jwt.sign({
            _id: user[0]._id,
            username: user[0].username
          }, process.env.SESSION_KEY);

          return done(null, user[0])
        });

      } else {

        facebookId = profile.id;
        user.token = jwt.sign({
          _id: user._id,
          username: user.username
        }, process.env.SESSION_KEY);

        return done(null, user)
      }
    })
  }
));

app.get('/login/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email', 'user_hometown']})
);

app.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // console.log('req is ', req);
    var token = req.user.token;
    console.log('token is ', token);
    // knex('users').first().where('facebookId', facebookId).then(function(user){
    //   console.log('user returned to callback is ', user);
    //   console.log('token is ', req.user.token);
    // });

    res.json({token: token})
});

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
})


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
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
