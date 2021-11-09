const express = require('express');
const router = express.Router();
const holidayController = require('../controller/holidays.controller');

// holiday routers
// create holiday
router.post('/createHoliday', holidayController.createHoliday);
// update holiday
router.post('/:id/updateHoliday', holidayController.updateHoliday);
// delete holidays
router.post('/:id/deleteHoliday', holidayController.deleteHoliday);

module.exports = router;