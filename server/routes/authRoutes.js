// routes/authRoutes.js
const express = require('express');
const {signup, verifyOtp}= require('../controllers/authController');
const upload = require('../middleware/upload');

const router = express.Router();

// Sign Up
router.post('/signup', upload.single('profilePicture'), signup);

// Verify OTP
router.post('/verify-otp', verifyOtp);

module.exports = router;