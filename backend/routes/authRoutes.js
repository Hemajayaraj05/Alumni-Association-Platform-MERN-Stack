const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController'); // Ensure correct import path
const router = express.Router();

// User registration and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
