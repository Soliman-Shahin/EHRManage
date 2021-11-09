const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const passport = require('passport')
const multer = require("multer")

// configure multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/images')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})
var upload = multer({ storage: storage })

// middleware to check if user is logged in
isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

// login user view
router.get('/login', userController.login);

// login post request
router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })
);

// sign up form 
router.get('/signup', userController.signUp);

// sign up post request
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/users/login',
        failureRedirect: '/users/signup',
        failureFlash: true
    })
)

// profile
router.get('/profile', isAuthenticated, userController.userProfile);
//upload user avatar
router.post('/uploadAvatar', upload.single('avatar'), userController.uploadAvatar);
// delete user
router.post('/:id/deleteUser', userController.deleteUser);
// logout user
router.get('/logout', userController.logout);


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login'
    }), (req, res) => {
        res.redirect('/users/profile')
    });


// Redirect the user to Google for authentication.  When complete,
// Google will redirect the user back to the application at
//     /auth/google/callback
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login'
    }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/users/profile');
    });

module.exports = router