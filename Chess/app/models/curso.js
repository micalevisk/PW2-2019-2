'use strict';
const { capitalize } = require('../../lib/utils');

module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    initials: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {//§
          args: true,
          msg: 'Este campo não pode estar vazio!'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Apenas números e letras de A a Z são permitidos!'
        },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {//§
          arg: true,
          msg: 'Este campo não pode estar vazio!'
        },
        len: {
          args: [4, 50],
          msg: 'O nome deve entre 4 a 50 caracteres!'
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {//§
          arg: true,
          msg: 'Este campo não pode estar vazio!'
        },
      }
    },
    id_area: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
    hooks: {
      beforeValidate(curso, options) {
        curso.initials = curso.initials.trim();
        curso.name = curso.name.trim();
      },
      beforeSave(curso, options) {
        curso.initials = curso.initials.toUpperCase();
        curso.name = capitalize(curso.name);
      },
    }
  });
  curso.associate = function(models) {
    curso.belongsTo(models.area, {
      foreignKey: 'id_area',
    });
  };
  return curso;
};
