const User = require('../models/userModel');

const getUserDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }, // Exclude sensitive data
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
};

module.exports = { getUserDetails };