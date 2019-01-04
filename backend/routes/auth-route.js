const express = require('express');
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local"); //LocalStrategy returns a constructor function, thus needing capitalization



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
// ==========

//some route that is only accessible if user is logged in
router.get("/eatIn", isLoggedIn,function(req, res) {
    //res.render("eatin");
});

// AUTH ROUTES
// ===========

// show signup form
router.get("/register", function(req, res) {
    res.render("signup");
});

//handling user sign up
router.post("/signup", function(req, res) {
    //req.body.username
    //req.body.password
    console.log(req.body.username);
    console.log(req.body.password);
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.sendStatus(401).json({
              error: "username is taken"
            })
        }
        passport.authenticate("local")(req, res, function() { //log user in, take care of everything in the session, run serializefield and use the local strategy
            return res.json({id:user.id});
        });
    });
});

//LOGIN ROUTES
//render login form
router.get("/login", function(req, res) {
    //res.send({express: "landing"});
    //res.render("signup");
    res.send({express: "YO! YOUVE REACHED THE LOGIN GET ROUTE"});
});

//login logic
router.post("/login", authenticate);

function authenticate(req, res, next)  { 
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    }
    else if (!user) {
      return res.sendStatus(401).json({
        error: 'Incorrect email or password'
      }); 
    }
    else{
      req.logIn(user, function(err) {
        if (err) { 
          return next(err); 
        }
        else
        {
         return res.json({id:user.id});
      }
      });
    }
  })(req, res, next);
}

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//these are standard params for a middleware. next refers to the next thing that needs to be called
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
