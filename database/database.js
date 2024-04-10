const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('appresep', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
