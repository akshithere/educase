const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.post('/schools', schoolController.addSchool);
router.get('/schools', schoolController.listSchools);
router.get('/health', schoolController.healthCheck);

module.exports = router;
