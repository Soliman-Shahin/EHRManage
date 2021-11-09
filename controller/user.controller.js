const User = require('../models/user.model')


exports.login = (req, res) => {
    res.render('user/login', {
        error: req.flash('error'),
        title: 'EHRManage | Login Page'
    })
};

exports.signUp = (req, res) => {
    res.render('user/signup', {
        error: req.flash('error'),
        title: 'EHRManage | Signup Page'
    })
};

exports.userProfile = (req, res) => {
    res.render('user/profile', {
        success: req.flash('success'),
        title: 'EHRManage | Profile Page'
    })
};

exports.uploadAvatar = (req, res) => {
    let newFields = {
        avatar: req.file.filename
    }
    User.updateOne({ _id: req.user._id }, newFields, (err) => {
        if (!err) {
            res.redirect('/users/profile')
        }
    })
}

exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id }, (err) => {
        if (!err) {
            console.log('User was Deleted')
            req.flash('info', 'User Deleted successfully')
            res.redirect('/home')
        } else {
            console.log(err)
        }
    })
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/users/login');
};