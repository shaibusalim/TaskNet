const { body, validationResult } = require('express-validator');

const validateSignup = [
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('role').isIn(['taskPoster', 'taskHelper', 'both']).withMessage('Invalid role'),
];

const validateOTP = [
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  body('code').notEmpty().withMessage('OTP code is required'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateSignup, validateOTP, validate };