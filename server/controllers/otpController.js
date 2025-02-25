const OTP = require('../models/otpModel');
const User = require('../models/userModel');
const { verifyOTP } = require('../services/twilio');

exports.verifyOTP = async (req, res) => {
  const { phoneNumber, code } = req.body;

  try {
    const otp = await OTP.findOne({ where: { phoneNumber, code } });

    if (!otp || otp.expiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    await User.update({ verified: true }, { where: { phoneNumber } });
    await OTP.destroy({ where: { phoneNumber } });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};