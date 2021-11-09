const express = require('express');
const router = express.Router();
const policyController = require('../controller/policy.controller');

// policy routers
// create policy
router.post('/createPolicy', policyController.createPolicy);
// update policy
router.post('/:id/updatePolicy', policyController.updatePolicy);
// delete policy
router.post('/:id/deletePolicy', policyController.deletePolicy);

module.exports = router;