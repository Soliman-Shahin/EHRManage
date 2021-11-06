const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance.model');

// day routers
// create day
router.post('/createDay', (req, res) => {
    let day = new Attendance({
        day: req.body.day
    });
    day.save((err) => {
        if (!err) {
            console.log('Attendance Day was Created')
            req.flash('info', 'Attendance Day created successfully')
            res.redirect('/dashboard/attendance')
        } else {
            console.log(err)
        }
    })
});

// delete day
router.post('/:id/deleteDay', (req, res) => {
    Attendance.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (!err) {
            console.log('Attendance Day was Deleted')
            req.flash('info', 'Attendance Day Deleted successfully')
            res.redirect('/dashboard/attendance')
        } else {
            console.log(err)
        }
    })
})

// attendance routers
// create attendance
router.post('/createAttendance', (req, res) => {
    Attendance.updateOne({ _id: req.body.attDay }, {
        $push: {
            employee: {
                empNo: req.body.empNo,
                empFName: req.body.empFName,
                empLName: req.body.empLName,
                attTime: req.body.attTime,
                depTime: req.body.depTime
            }
        }
    }, (err) => {
        if (!err) {
            console.log('Attendance was Created')
            req.flash('info', 'Attendance created successfully')
            res.redirect('/dashboard/attendance')
        } else {
            console.log(err)
        }
    })
})

// delete attendance
router.post('/:id/:empNo/deleteAttendance', (req, res) => {
    Attendance.updateOne({ _id: req.params.id }, { $pull: { employee: { empNo: req.params.empNo } } }, { multi: false },
        (err) => {
            if (!err) {
                console.log('Attendance was Deleted')
                req.flash('info', 'Attendance Deleted successfully')
                res.redirect('/dashboard/attendance')
            } else {
                console.log(err)
            };
        })
});

module.exports = router;