const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('appresep', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Comment = sequelize.define('comments', {
  id_comment: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  content_comment: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Comment