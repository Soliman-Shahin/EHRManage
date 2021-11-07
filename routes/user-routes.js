const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
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
router.get('/login', (req, res) => {
    res.render('user/login', {
        error: req.flash('error'),
        title: 'EHRManage | Login Page'
    })
})

// login post request 
router.post('/login',
    passport.authenticate('local.login', {
        successRedirect: '/users/profile',
        failureRedirect: '/users/login',
        failureFlash: true
    })
)

// sign up form 
router.get('/signup', (req, res) => {
    res.render('user/signup', {
        error: req.flash('error'),
        title: 'EHRManage | Signup Page'
    })
})

// sign up post request
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/users/login',
        failureRedirect: '/users/signup',
        failureFlash: true
    })
)

// profile 
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('user/profile', {
        success: req.flash('success'),
        title: 'EHRManage | Profile Page'
    })
})

//upload user avatar
router.post('/uploadAvatar', upload.single('avatar'), (req, res) => {
    let newFields = {
        avatar: req.file.filename
    }
    User.updateOne({ _id: req.user._id }, newFields, (err) => {
        if (!err) {
            res.redirect('/users/profile')
        }
    })
})

// delete user
router.post('/:id/deleteUser', (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err) => {
        if (!err) {
            console.log('User was Deleted')
            req.flash('info', 'User Deleted successfully')
            res.redirect('/home')
        } else {
            console.log(err)
        }
    })
})

// logout user
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
})


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