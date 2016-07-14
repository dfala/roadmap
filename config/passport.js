var LocalStrategy   = require('passport-local').Strategy,
    User            = require('../models/UserModel.js');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function() {
          // we are checking to see if the user trying to login already exists
          User.findOne({ 'email' :  email }, function(err, user) {
              if (err) return done(err);

              // check to see if theres already a user with that email
              if (user) {
                if (user.validPassword(password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
              } else {
                  // if there is no user with that email
                  var newUser = new User();
                  newUser.email    = email;
                  newUser.password = newUser.generateHash(password);

                  newUser.save(function(err, result) {
                      if (err) throw err;
                      saveSellerInfo(result);
                      return done(null, newUser);
                  });
              }
          });
        });
    }));
};
