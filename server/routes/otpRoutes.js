const express = require('express');
const otpController = require('../controllers/otpController');
const { validateOTP, validate } = require('../middleware/validation');

const router = express.Router();

router.post('/verify', validateOTP, validate, otpController.verifyOTP);

module.exports = router;