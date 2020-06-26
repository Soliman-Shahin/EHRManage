const express = require('express');
const router = express.Router();
const Policy = require('../models/policy.model');

// policy routers
// create policy
router.post('/createPolicy', (req, res) => {
    let policy = new Policy({
        policyNo: req.body.policyNo,
        policyName: req.body.policyName,
        revisiondate: req.body.revisiondate,
        detalis: req.body.detalis
    });
    policy.save((err) => {
        if (!err) {
            console.log('Policy was Created')
            req.flash('info', 'Policy created successfuly')
            res.redirect('/dashboard/policy')
        } else {
            console.log(err)
        }
    })
});

// update policy
router.post('/:id/updatePolicy', (req, res) => {
    let newfeilds = {
        policyNo: req.body.policyNo,
        policyName: req.body.policyName,
        revisiondate: req.body.revisiondate,
        detalis: req.body.detalis
    }
    Policy.updateOne({ _id: req.params.id }, newfeilds,
        (err) => {
            if (!err) {
                console.log('Policy was Updated')
                req.flash('info', 'Policy Updated successfuly')
                res.redirect('/dashboard/policy')
            } else {
                console.log(err)
            }
        })
});

// delete policy
router.post('/:id/deletePolicy', (req, res) => {
    Policy.deleteOne({ _id: req.params.id },
        (err) => {
            if (!err) {
                console.log('Policy was Deleted')
                req.flash('info', 'Policy Deleted successfuly')
                res.redirect('/dashboard/policy')
            } else {
                console.log(err)
            }
        })
});

module.exports = router;