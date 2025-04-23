const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const School = sequelize.define('School', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'schools',
  timestamps: false
});

module.exports = School;
