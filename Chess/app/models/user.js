const { Model, DataTypes } = require('sequelize');

const { cryptPassword } = require('../../lib/utils');

class User extends Model {
  static init(sequelize) {
    super.init({

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: {
            args: [3, 100],
            msg: 'Seu nome precisa ter de 3 a 100 caracteres!',
          },
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: {
            args: true,
            msg: 'Email inválido!',
          },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: {
            args: [6, 20],
            msg: 'Sua senha deve ter entre 6 a 20 caracteres!',
          },
        },
      },

      id_curso: DataTypes.INTEGER, // TODO: remover quando for adicionar a relação

    }, {
      sequelize,
      modelName: 'user',
      freezeTableName: true,
      underscored: true,
      hooks: {
        beforeValidate(user) {
          user.name = user.name.trim();
          user.password = user.password.trim();
        },
        beforeSave(user) {
          user.name = user.name.toLowerCase();
          return cryptPassword(user.password)
            .then((encryptedPassword) => {
              user.password = encryptedPassword;
            });
        },
      },
    });
  }
}

module.exports = User;
