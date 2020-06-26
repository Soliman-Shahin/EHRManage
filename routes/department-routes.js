const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');

// department routers
// create department
router.post('/createDepartment', (req, res) => {
    let department = new Department({
        deptNo: req.body.deptNo,
        deptName: req.body.deptName
    });
    department.save((err) => {
        if (!err) {
            console.log('Department was Created')
            req.flash('info', 'Department created successfuly')
            res.redirect('/dashboard/department')
        } else {
            console.log(err)
        }
    })
});

// update department
router.post('/:id/updateDepartment', (req, res) => {
    let newfeilds = {
        deptNo: req.body.deptNo,
        deptName: req.body.deptName
    }
    Department.updateOne({ _id: req.params.id }, newfeilds,
        (err) => {
            if (!err) {
                console.log('Department was Updated')
                req.flash('info', 'Department Updated Successfuly')
                res.redirect('/dashboard/department')
            } else {
                console.log(err)
            }
        })
});

// delete department
router.post('/:id/deleteDepartment', (req, res) => {
    Department.deleteOne({ _id: req.params.id },
        (err) => {
            if (!err) {
                console.log('Department was Deleted')
                req.flash('info', 'Department Deleted Successfuly')
                res.redirect('/dashboard/department')
            } else {
                console.log(err)
            }
        })
});

module.exports = router;