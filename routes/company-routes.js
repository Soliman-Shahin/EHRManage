const express = require('express');
const router = express.Router();
const companyController = require('../controller/company.controller');
const fileUpload = require('express-fileupload');
router.use(fileUpload());

// company routes
// create company
router.post('/createCompany', companyController.createCompany);
// // company details
router.get('/:id', companyController.company);
// update company
router.post('/:id/updateCompany', companyController.updateCompany);
// delete company
router.post('/:id/deleteCompany', companyController.deleteCompany);


module.exports = router;