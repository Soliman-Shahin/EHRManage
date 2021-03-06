const express = require('express');
const router = express.Router();

const Employee = require('../models/employee.model');

// employee routes
// create employee
router.post('/createEmployee', (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/employees/' + req.body.empNo + ".png",
            (err) => {
                if (err)
                    return res.status(500).send(err);
            });
        let employee = new Employee({
            empNo: req.body.empNo,
            empFName: req.body.empFName,
            empLName: req.body.empLName,
            empEmail: req.body.empEmail,
            empAddress: req.body.empAddress,
            empBDay: req.body.empBDay,
            empPhone: req.body.empPhone,
            empGender: req.body.empGender,
            empRole: req.body.empRole,
            empBankNo: req.body.empBankNo,
            empNationality: req.body.empNationality,
            empNationalId: req.body.empNationalId,
            empCollegeDegree: req.body.empCollegeDegree,
            empRelationship: req.body.empRelationship,
            empSalary: req.body.empSalary,
            empHolidays: req.body.empHolidays,
            empDepartment: req.body.empDepartment,
            empType: req.body.empType,
            contractType: req.body.contractType,
            empImg: req.files.imageFile.data
        });
        employee.save((err) => {
            if (!err) {
                console.log('Employee was Added')
                req.flash('info', 'Employee Added successfuly')
                res.redirect('/dashboard/employee')
            } else {
                console.log(err)
            }
        });
    } else {
        res.status(500).json({
            success: false,
            msg: 'no image for upload'
        });
    }
});

// update employee
router.post('/:id/updateEmployee', (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/employees/' + req.body.empNo + ".png",
            (err) => {
                if (err)
                    return res.status(500).send(err);
            });
        let newfeilds = {
            empNo: req.body.empNo,
            empFName: req.body.empFName,
            empLName: req.body.empLName,
            empEmail: req.body.empEmail,
            empAddress: req.body.empAddress,
            empBDay: req.body.empBDay,
            empPhone: req.body.empPhone,
            empGender: req.body.empGender,
            empRole: req.body.empRole,
            empBankNo: req.body.empBankNo,
            empNationality: req.body.empNationality,
            empNationalId: req.body.empNationalId,
            empCollegeDegree: req.body.empCollegeDegree,
            empRelationship: req.body.empRelationship,
            empSalary: req.body.empSalary,
            empHolidays: req.body.empHolidays,
            empDepartment: req.body.empDepartment,
            empType: req.body.empType,
            contractType: req.body.contractType,
            empImg: req.files.imageFile.data
        }
        Employee.updateOne({ _id: req.params.id }, newfeilds,
            (err) => {
                if (!err) {
                    console.log('Employee was Updated')
                    req.flash('info', 'Employee Updated successfuly')
                    res.redirect('/dashboard/employee')
                } else {
                    console.log(err)
                }
            })
    } else {
        res.status(500).json({
            success: false,
            msg: 'no image for upload'
        });
    }
});

// delete employee
router.post('/:id/deleteEmployee', (req, res) => {
    Employee.deleteOne({ _id: req.params.id },
        (err) => {
            if (!err) {
                console.log('Employee was Deleted')
                req.flash('info', 'Employee Deleted successfuly')
                res.redirect('/dashboard/employee')
            } else {
                console.log(err)
            }
        })
});

module.exports = router;