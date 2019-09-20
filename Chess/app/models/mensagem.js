'use strict';
module.exports = (sequelize, DataTypes) => {
  const mensagem = sequelize.define('mensagem', {
    id_partida: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    underscored: true,
  });
  mensagem.associate = function(models) {
    // associations can be defined here
  };
  return mensagem;
};
