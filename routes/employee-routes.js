const express = require('express');
const router = express.Router();

const employeeController = require('../controller/employee.controller');

// employee routes
// create employee
router.post('/createEmployee', employeeController.createEmployee);
// update employee
router.post('/:id/updateEmployee', employeeController.updateEmployee);
// delete employee
router.post('/:id/deleteEmployee', employeeController.deleteEmployee);

module.exports = router;