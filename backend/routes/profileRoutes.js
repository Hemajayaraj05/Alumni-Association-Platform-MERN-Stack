const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController'); // Ensure correct path

// Route to update profile
router.put('/updateProfile/:id', updateProfile);

module.exports = router;
