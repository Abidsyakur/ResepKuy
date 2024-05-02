// // Import model Comment dan Sequelize dari modul yang sesuai
// const Comment = require('./comments'); // Sesuaikan path sesuai struktur file Anda
// const { Sequelize, DataTypes } = require('sequelize');

// // Inisialisasi instance Sequelize baru dengan kredensial database
// const sequelize = new Sequelize('appresep', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// // Definisikan model Recipe dengan propertinya
// const Recipe = sequelize.define('Recipe', {
//   // properti id_recipe
//   id_recipe: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   // properti title_recipe
//   title_recipe: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   // properti description_recipe
//   description_recipe: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   // properti ingredients_recipe
//   ingredients_recipe: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   // properti instructions_recipe
//   instructions_recipe: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   // properti image_recipe
//   image_recipe: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   // properti category_id
//   category_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   // properti user_id
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   // properti createdAt
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
//   },
//   // properti updatedAt
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     allowNull: false
//   }
// }, {
//   // Nonaktifkan timestamps untuk model Recipe
//    sequelize,
//   modelName: 'Recipe'
// });


// Recipe.hasMany(Comment, { foreignKey: 'recipe_id' }); // Assuming a recipe can have multiple comments


// // Ekspor model Recipe
// module.exports = Recipe;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config.js');

const User = require('./users');
const Category = require('./categories');

class Recipe extends Model {}

Recipe.init({
  id_recipe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title_recipe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description_recipe: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ingredients_recipe: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions_recipe: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image_recipe: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // properti category_id
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // properti user_id
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // pro
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'Recipe',
});

// Recipe.hasMany(Comment, {
//   foreignKey: 'recipeId',
//   as: 'comments',
// });

// Recipe.belongsToMany(Category, {
//   through: 'RecipeCategories',
//   foreignKey: 'recipeId',
//   as: 'categories',
// });

// Recipe.belongsTo(User, {
//   foreignKey: 'id_user',
//   as: 'user',
// });

Recipe.belongsTo(Category, { foreignKey: 'category_id' });
Recipe.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Recipe;