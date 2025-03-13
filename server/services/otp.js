const nodemailer = require('nodemailer');
const validator = require('validator');
const User = require('../models/userModel');
require('dotenv').config();

// Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
const sendOtpEmail = async (email) => {
    console.log('Sending OTP to:', email); // Log the recipient email
  
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
  
    try {
      // Update user with OTP and expiry
      await User.update({ otp, otpExpiry }, { where: { email } });
      console.log('OTP and expiry updated in the database.');
  
      // Send email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Verification',
        text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('OTP email sent successfully:', info.response);
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP email. Please try again.');
    }
  };

module.exports = { sendOtpEmail };