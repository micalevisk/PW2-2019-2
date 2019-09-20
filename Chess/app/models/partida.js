'use strict';
module.exports = (sequelize, DataTypes) => {
  const partida = sequelize.define('partida', {
    id_user_1: DataTypes.INTEGER,
    id_user_2: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    fen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
  }, {
    underscored: true,
  });
  partida.associate = function(models) {
    // associations can be defined here
  };
  return partida;
};
