const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('MySQL connected via Sequelize'))
  .catch(err => console.error('Unable to connect:', err));

module.exports = sequelize;
