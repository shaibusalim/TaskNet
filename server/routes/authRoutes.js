const express = require('express');
const authController = require('../controllers/authController');
const { validateSignup, validate } = require('../middleware/validation');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/signup', upload.single('profilePicture'), validateSignup, validate, authController.signup);
router.post('/login', authController.login);

module.exports = router;