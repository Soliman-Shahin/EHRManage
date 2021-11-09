const Company = require('../models/company.model');
const Employee = require('../models/employee.model');
const Policy = require('../models/policy.model');
const Attendance = require('../models/attendance.model');
const Holiday = require('../models/holidays.model');

exports.homePage = (req, res) => {
    res.render('user/index', {
        title: 'EHRManage | Home Page'
    })
};

exports.companyPage = (req, res) => {
    let companyQuery = Company.find(null);
    companyQuery.where('user_id').equals(req.user.id)
    companyQuery.exec((err, company) => {
        res.render('dashboard/company', {
            company: company,
            message: req.flash('info'),
            title: 'EHRManage | Company Page'
        })
    })
};

exports.departmentPage = (req, res) => {
    let companyQuery = Company.find(null);
    companyQuery.where('user_id').equals(req.user.id)
        //query.find({field1:value1,general.field2:val2});
        //query.limit(3) //no of returned records
        //query.sort(field1:-1)
        //query.where('name.firstName').equals('value')
        //query.where('age').gt(17).lt(66) from to
        //query.where('favorites').in(['football','basketball'])
        // query.select('deptName');
    companyQuery.exec((err, company) => {
        res.render('dashboard/department', {
            company: company,
            message: req.flash('info'),
            title: 'EHRManage | Department Page'
        })
    })
};

exports.employeePage = (req, res) => {
    let companyQuery = Company.find(null);
    companyQuery.where('user_id').equals(req.user.id)
    let empQuery = Employee.find(null);
    empQuery.where('user_id').equals(req.user.id)
    let policyQuery = Policy.find(null);
    policyQuery.where('user_id').equals(req.user.id)
    companyQuery.exec((err, company) => {
        policyQuery.exec((err, policies) => {
            empQuery.exec((err, emps) => {
                res.render('dashboard/employee', {
                    company: company,
                    emps: emps,
                    policies: policies,
                    success: req.flash('success'),
                    title: 'EHRManage | Employees Page'
                })
            })
        })
    })
};

exports.policyPage = (req, res) => {
    let policyQuery = Policy.find(null);
    policyQuery.where('user_id').equals(req.user.id)
    let companyQuery = Company.find(null);
    companyQuery.where('user_id').equals(req.user.id)
    companyQuery.exec((err, company) => {
        policyQuery.exec((err, policies) => {
            res.render('dashboard/policy', {
                company: company,
                policies: policies,
                success: req.flash('success'),
                title: 'EHRManage | policies Page'
            })
        })
    })
};

exports.attendancePage = (req, res) => {
    let dayQuery = Attendance.find(null);
    dayQuery.where('user_id').equals(req.user.id)
    let empQuery = Employee.find(null);
    empQuery.where('user_id').equals(req.user.id)
    let companyQuery = Company.find(null);
    companyQuery.where('user_id').equals(req.user.id)
    companyQuery.exec((err, company) => {
        dayQuery.exec((err, day) => {
            empQuery.exec((err, emps) => {
                res.render('dashboard/attendance', {
                    company: company,
                    day: day,
                    emps: emps,
                    success: req.flash('success'),
                    title: 'EHRManage | Attendance Page'
                })
            })
        })
    })
};

exports.holidaysPage = (req, res) => {
    let dayQuery = Holiday.find(null);
    dayQuery.where('user_id').equals(req.user.id)
    let empQuery = Employee.find(null);
    empQuery.where('user_id').equals(req.user.id)
    let companyQuery = Company.find(null);
    companyQuery.where('user_id').equals(req.user.id)
    companyQuery.exec((err, company) => {
        dayQuery.exec((err, holiday) => {
            empQuery.exec((err, emps) => {
                res.render('dashboard/holidays', {
                    company: company,
                    holiday: holiday,
                    emps: emps,
                    success: req.flash('success'),
                    title: 'EHRManage | Holidays Page'
                })
            })
        })
    })
};