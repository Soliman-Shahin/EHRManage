const express = require("express");
const router = express.Router();
const pagesController = require('../controller/pages.controller');

// home page route
router.get('/home', pagesController.homePage)

// ------------------------- dashboard Pages Routes --------------------------//
// middleware to check if user is logged in
isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next()
    res.redirect('/users/login')
}

// company page
router.get('/dashboard/company', isAuthenticated, pagesController.companyPage);
// department page
router.get('/dashboard/department', isAuthenticated, pagesController.departmentPage);
// employee page
router.get('/dashboard/employee', isAuthenticated, pagesController.employeePage);
// policy page
router.get('/dashboard/policy', isAuthenticated, pagesController.policyPage);
// attendance page
router.get('/dashboard/attendance', isAuthenticated, pagesController.attendancePage);
// holidays page
router.get('/dashboard/holidays', isAuthenticated, pagesController.holidaysPage);

module.exports = router