const { Model, DataTypes } = require('sequelize');

class Partida extends Model {
  static init(sequelize) {
    super.init({

      id_user_1: DataTypes.INTEGER,

      id_user_2: DataTypes.INTEGER,

      winner: DataTypes.INTEGER,

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
