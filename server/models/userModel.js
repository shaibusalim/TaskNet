const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/Database");

class User extends Model{}

User.init({
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
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('taskPoster', 'taskHelper', 'both'),
    allowNull: false,
    defaultValue: 'taskHelper'
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
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
},{
    sequelize,
    modelName: 'User'
})

module.exports = User;

