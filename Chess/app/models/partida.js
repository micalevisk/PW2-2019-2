const { Model, DataTypes } = require('sequelize');

class Partida extends Model {
  static init(sequelize) {
    super.init({

      id_user_1: DataTypes.INTEGER, // TODO: remover quando for adicionar a relação

      id_user_2: DataTypes.INTEGER, // TODO: remover quando for adicionar a relação

      winner: DataTypes.INTEGER, // TODO: remover quando for adicionar a relação

      fen: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

    }, {
      sequelize,
      modelName: 'partida',
      freezeTableName: true,
      underscored: true,
    });
  }
}

module.exports = Partida;
