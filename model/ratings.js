const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('appresep', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Rating = sequelize.define('ratings', {
  id_rating: {
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
    }
  }, {
    timestamps: false
  });

module.exports = Rating