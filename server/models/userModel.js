// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('taskPoster', 'taskHelper', 'both'),
    allowNull: false,
  },
  skills: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  experienceLevel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  taskPreferences: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otpExpiry: {
    type: DataTypes.DATE,
    allowNull: true,
  },

});

module.exports = User;