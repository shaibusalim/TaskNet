// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { sendOtpEmail } = require('../services/otp');

// Sign Up
const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      location,
      role,
      skills,
      experienceLevel,
      availability,
      bio,
      taskPreferences,
    } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      location,
      role,
      skills: JSON.parse(skills),
      experienceLevel,
      availability,
      bio,
      taskPreferences: JSON.parse(taskPreferences),
      profilePicture: req.file ? req.file.path : null,
    });

    // Send OTP to the user's email
    await sendOtpEmail(email);

    res.status(201).json({ message: 'User created successfully. Please check your email for OTP.', user });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Error signing up. Please try again.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET, // Use a secret key from environment variables
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return the token and user details (excluding the password)
    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if OTP matches and is not expired
    if (user.otp !== otp || new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // Mark user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully. You can now log in.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Error verifying OTP. Please try again.' });
  }
};



module.exports ={
    signup,
    verifyOtp,
    login
}