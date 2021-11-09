const Policy = require('../models/policy.model');

exports.createPolicy = (req, res) => {
    let policy = new Policy({
        policyNo: req.body.policyNo,
        policyName: req.body.policyName,
        details: req.body.details,
        user_id: req.user.id
    });
    policy.save((err) => {
        if (!err) {
            console.log('Policy was Created')
            req.flash('info', 'Policy created successfully')
            res.redirect('/dashboard/policy')
        } else {
            console.log(err)
        }
    })
};

exports.updatePolicy = (req, res) => {
    let newfeilds = {
        policyNo: req.body.policyNo,
        policyName: req.body.policyName,
        details: req.body.details
    }
    Policy.updateOne({ _id: req.params.id }, newfeilds,
        (err) => {
            if (!err) {
                console.log('Policy was Updated')
                req.flash('info', 'Policy Updated successfully')
                res.redirect('/dashboard/policy')
            } else {
                console.log(err)
            }
        })
};

exports.deletePolicy = (req, res) => {
    Policy.deleteOne({ _id: req.params.id },
        (err) => {
            if (!err) {
                console.log('Policy was Deleted')
                req.flash('info', 'Policy Deleted successfully')
                res.redirect('/dashboard/policy')
            } else {
                console.log(err)
            }
        })
};