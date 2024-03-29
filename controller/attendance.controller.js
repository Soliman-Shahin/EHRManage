const Attendance = require('../models/attendance.model');

exports.createDay = (req, res) => {
    let day = new Attendance({
        day: req.body.day,
        user_id: req.user.id

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
};

exports.deleteDay = (req, res) => {
    Attendance.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (!err) {
            console.log('Attendance Day was Deleted')
            req.flash('info', 'Attendance Day Deleted successfully')
            res.redirect('/dashboard/attendance')
        } else {
            console.log(err)
        }
    })
};

exports.createAttendance = (req, res) => {
    Attendance.updateOne({ _id: req.body.attDay }, {
        $push: {
            employee: {
                empId: req.body.empId,
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
}

exports.deleteAttendance = (req, res) => {
    Attendance.updateOne({ _id: req.params.id }, { $pull: { employee: { empId: req.params.empId } } }, { multi: false },
        (err) => {
            if (!err) {
                console.log('Attendance was Deleted')
                req.flash('info', 'Attendance Deleted successfully')
                res.redirect('/dashboard/attendance')
            } else {
                console.log(err)
            };
        })
};