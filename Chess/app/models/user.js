'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 50],
          msg: 'O nome precisa ter de 3 a 50 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    id_curso: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
