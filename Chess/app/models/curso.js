'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    initials: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    id_area: DataTypes.INTEGER
  }, {
    underscored: true,
    freezeTableName: true,
  });
  curso.associate = function(models) {
    // associations can be defined here
  };
  return curso;
};
