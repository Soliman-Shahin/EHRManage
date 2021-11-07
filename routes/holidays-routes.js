const express = require('express');
const router = express.Router();
const Holiday = require('../models/holidays.model');

// holiday routers
// create holiday
router.post('/createHoliday', (req, res) => {
    let holiday = new Holiday({
        empId: req.body.empId,
        empFName: req.body.empFName,
        empLName: req.body.empLName,
        holiDate: req.body.holiDate,
        remainingDays: req.body.remainingDays,
        user_id: req.user.id
    });
    holiday.save((err) => {
        if (!err) {
            console.log('Holiday was Created')
            req.flash('info', 'Holiday created successfully')
            res.redirect('/dashboard/holidays')
        } else {
            console.log(err)
        }
    })
});

// update holiday
router.post('/:id/updateHoliday', (req, res) => {
    let newfeilds = {
        holiDate: req.body.holiDate,
        remainingDays: req.body.remainingDays
    }
    Holiday.updateOne({ _id: req.params.id }, newfeilds,
        (err) => {
            if (!err) {
                console.log('Holiday was Updated')
                req.flash('info', 'Holiday Updated successfully')
                res.redirect('/dashboard/holidays')
            } else {
                console.log(err)
            }
        })
});

// delete holidays
router.post('/:id/deleteHoliday', (req, res) => {
    Holiday.findByIdAndRemove({ _id: req.params.id },
        (err) => {
            if (!err) {
                console.log('Holiday was Deleted')
                req.flash('info', 'Holiday Deleted successfully')
                res.redirect('/dashboard/holidays')
            } else {
                console.log(err)
            }
        })
});

module.exports = router;