const twilio = require('twilio');
const OTP = require('../models/otpModel');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.sendOTP = async (phoneNumber) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(new Date().getTime() + 10 * 60000); // 10 minutes

  await OTP.create({ phoneNumber, code, expiresAt });

  await client.messages.create({
    body: `Your OTP code is ${code}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });
};

exports.verifyOTP = async (phoneNumber, code) => {
  const otp = await OTP.findOne({ where: { phoneNumber, code } });

  if (!otp || otp.expiresAt < new Date()) {
    throw new Error('Invalid or expired OTP');
  }

  return true;
};