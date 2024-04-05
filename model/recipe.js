const {
  Sequelize,
  DataTypes
} = require('sequelize');
const sequelize = new Sequelize('appresep', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const Recipe = sequelize.define('Recipe', {
  id_recipe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title_recipe: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description_recipe: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ingredients_recipe: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  instructions_recipe: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  image_recipe: {
    type: DataTypes.STRING,
    allowNull: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
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

module.exports = Recipe;