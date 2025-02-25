const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const { sendOTP } = require('../services/twilio');

exports.signup = async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    location,
    role,
    skills,
    experienceLevel,
    availability,
    bio,
    taskPreferences,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicture = req.file ? req.file.path : null;

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      location,
      profilePicture,
      role,
      skills: skills ? JSON.parse(skills) : null,
      experienceLevel,
      availability,
      bio,
      taskPreferences: taskPreferences ? JSON.parse(taskPreferences) : null,
    });

    await sendOTP(phoneNumber);

    res.status(201).json({ message: 'User created successfully. Please verify OTP.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};