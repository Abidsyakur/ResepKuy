const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('appresep', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Model Kategori
const Category = sequelize.define('categories', {
  id_categori: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_categori: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    timestamps: false
  });

module.exports = Category;