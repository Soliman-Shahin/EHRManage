const express = require('express');
const router = express.Router();
const attendanceController = require('../controller/attendance.controller');

// day routers
// create day
router.post('/createDay', attendanceController.createDay);
// delete day
router.post('/:id/deleteDay', attendanceController.deleteDay);

// attendance routers
// create attendance
router.post('/createAttendance', attendanceController.createAttendance);
// delete attendance
router.post('/:id/:empId/deleteAttendance', attendanceController.deleteAttendance);

module.exports = router;