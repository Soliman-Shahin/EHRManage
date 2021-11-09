const Company = require('../models/company.model');

exports.createDepartment = (req, res) => {
    Company.findById({ _id: req.body.company_id }, (err, comp) => {
        if (comp) {
            Company.findOne({ _id: req.body.company_id, "department.deptNo": req.body.deptNo }, (err, used) => {
                if (used) {
                    return res.status(200).json({ error: true, msg: 'This Department already in Company' });
                }
                if (!used) {
                    Company.updateOne({ _id: req.body.company_id }, {
                            $push: {
                                department: {
                                    deptNo: req.body.deptNo,
                                    deptName: req.body.deptName,
                                }
                            }
                        },
                        (err) => {
                            if (!err) {
                                console.log('Department was Created')
                                req.flash('info', 'Department created successfully')
                                res.redirect('/dashboard/department')
                            } else {
                                console.log(err)
                            }
                        })
                }
            })
        } else {
            return err
            console.log(err)
        }
    })
};

exports.updateDepartment = (req, res) => {
    Company.updateOne({ user_id: req.user.id, "department._id": req.params.id }, {
        $set: {
            "department.$.deptName": req.body.deptName
        }
    }, (err) => {
        if (!err) {
            console.log('Department was Updated')
            req.flash('info', 'Department Updated Successfully')
            res.redirect('/dashboard/department')
        } else {
            console.log(err)
        }
    })
};

exports.deleteDepartment = (req, res) => {
    Company.updateOne({ user_id: req.user.id }, { $pull: { department: { _id: req.params.id } } }, { multi: false },
        (err) => {
            if (!err) {
                console.log('Department was Deleted')
                req.flash('info', 'Department Deleted Successfully')
                res.redirect('/dashboard/department')
            } else {
                console.log(err)
            }
        })
};