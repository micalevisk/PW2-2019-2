const { Model, DataTypes } = require('sequelize');

const { capitalize } = require('../../lib/utils');

class Curso extends Model {
  static init(sequelize) {
    super.init({

      initials: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { // §
            args: true,
            msg: 'Este campo não pode estar vazio!',
          },
          isAlphanumeric: {
            args: true,
            msg: 'Apenas números e letras de A a Z são permitidos!',
          },
          len: {
            args: [3, 8],
            msg: 'A sigla deve ter entre 3 a 8 caracteres!',
          },
        },
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { // §
            arg: true,
            msg: 'Este campo não pode estar vazio!',
          },
          len: {
            args: [4, 50],
            msg: 'O nome deve entre 4 a 50 caracteres!',
          },
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { // §
            arg: true,
            msg: 'Este campo não pode estar vazio!',
          },
          len: {
            args: [6, 250],
            msg: 'Este campo deve ter entre 6 a 250 caracteres!',
          },
        },
      },

    }, {
      sequelize,
      modelName: 'curso',
      freezeTableName: true,
      underscored: true,
      hooks: {
        beforeValidate(curso) {
          curso.initials = curso.initials.trim();
          curso.name = curso.name.trim();
        },
        beforeSave(curso) {
          curso.initials = curso.initials.toUpperCase();
          curso.name = capitalize(curso.name);
        },
      },
    });
  }

  static associate(models) {
    this.belongsTo(models.area, { foreignKey: 'id_area', as: 'area' });
  }
}

module.exports = Curso;
