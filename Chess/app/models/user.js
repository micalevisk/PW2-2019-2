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
          msg: 'Seu nome precisa ter de 3 a 50 caracteres!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: {
          args: true,
          msg: 'Email inválido!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [4, 20],
          msg: 'Sua senha deve ter entre 4 a 20 caracteres!'
        }
      }
    },
    id_curso: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
    hooks: {
      beforeValidate(user, options) {
        user.name = user.name.trim();
        user.password = user.password.trim();
      },
      beforeSave(user, options) {
        return cryptPassword(user.password)
          .then((encryptedPassword) => {
            user.password = encryptedPassword;
          });
      },
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
