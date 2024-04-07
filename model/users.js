const {
  Sequelize,
  DataTypes
} = require('sequelize');
const sequelize = new Sequelize('appresep', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
 profile_image: {
   type: DataTypes.STRING,
   allowNull: true,
   validate: {
     isValid: function (value) {
       if (value !== null) {
         const base64regex = /^data:image\/([a-zA-Z0-9]+);base64,([^"]+)$/;
         return base64regex.test(value);
       }
       return true;
     }
   }
 },
}, {
  timestamps: false
});

// Export the User model
module.exports = User;