const { Model, DataTypes } = require('sequelize');

class Mensagem extends Model {
  static init(sequelize) {
    super.init({

      id_partida: DataTypes.INTEGER, // TODO: remover quando for adicionar a relação

      id_user: DataTypes.INTEGER, // TODO: remover quando for adicionar a relação

      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

    }, {
      sequelize,
      modelName: 'mensagem',
      freezeTableName: true,
      underscored: true,
    });
  }
}

module.exports = Mensagem;
