const { Model, DataTypes } = require('sequelize');

class Partida extends Model {
  static init(sequelize) {
    super.init({

      id_user_1: DataTypes.INTEGER, // TODO: remover quando for adicionar a relação

      id_user_2: DataTypes.INTEGER, // TODO: remover quando for adicionar a relação

      winner: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }, // TODO: remover quando for adicionar a relação

      fen: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
      },

      author_color: {
        type: DataTypes.ENUM('w', 'b'),
        validate: {
          isIn: [['w', 'b']],
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
