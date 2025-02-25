const  {DataTypes, Model} = require("sequelize");
const sequelize = require("../config/Database");

class OTP extends Model{};

OTP.init({
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},{
  sequelize,
  modelName: 'OTP'
})
module.exports = OTP;