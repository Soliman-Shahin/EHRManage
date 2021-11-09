const express = require('express');
const router = express.Router();
const departmentController = require('../controller/department.controller');

// department routers
// create department
router.post('/createDepartment', departmentController.createDepartment);
// update department
router.post('/:id/updateDepartment', departmentController.updateDepartment);
// delete department
router.post('/:id/deleteDepartment', departmentController.deleteDepartment);

module.exports = router;