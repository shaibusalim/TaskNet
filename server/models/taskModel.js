const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payment: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'High', 'Highest'),
    defaultValue: 'Low',
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'),
    defaultValue: 'Pending',
  },
  attachment: {
    type: DataTypes.STRING, // Store file path or URL
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER, // Associate task with a user
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Task;