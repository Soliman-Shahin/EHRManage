const Employee = require('../models/employee.model');

exports.createEmployee = (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/employees/' + req.body.empEmail + ".png",
            (err) => {
                if (err)
                    return res.status(500).send(err);
            });
        let employee = new Employee({
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
            empImg: req.files.imageFile.data,
            user_id: req.user.id
        });
        employee.save((err) => {
            if (!err) {
                console.log('Employee was Added')
                req.flash('info', 'Employee Added successfully')
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
};

exports.updateEmployee = (req, res) => {
    if (req.files) {
        // file upload : imageFile is name of input
        // uploads folder name
        req.files.imageFile.mv('uploads/employees/' + req.body.empEmail + ".png",
            (err) => {
                if (err)
                    return res.status(500).send(err);
            });
        let newfeilds = {
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
                    req.flash('info', 'Employee Updated successfully')
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
};

exports.deleteEmployee = (req, res) => {
    Employee.deleteOne({ _id: req.params.id },
        (err) => {
            if (!err) {
                console.log('Employee was Deleted')
                req.flash('info', 'Employee Deleted successfully')
                res.redirect('/dashboard/employee')
            } else {
                console.log(err)
            }
        })
};