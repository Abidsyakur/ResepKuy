
// const { Sequelize, DataTypes, Model } = require('sequelize');

// // Inisialisasi instance Sequelize baru dengan kredensial database
// const sequelize = new Sequelize('appresep', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

const User = require('./users'); // Import the User model

// class Comment extends Model {}

// Comment.init({
//   id_comment: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   // Define other attributes for the Comment model
//   recipe_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   content_comment: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
// }, {
//   sequelize,
//   modelName: 'Comment',
// });

// // Define associations
// Comment.belongsTo(User, { foreignKey: 'user_id' }); // Associate Comment with User

// module.exports = Comment;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');


class Comment extends Model {}

Comment.init({
  id_comment: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content_comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
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
  modelName: 'Comment',
});

Comment.belongsTo(User, { foreignKey: 'user_id' }); // Associate Comment with User


module.exports = Comment;