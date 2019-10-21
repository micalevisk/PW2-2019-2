const { Model, DataTypes } = require('sequelize');

class Mensagem extends Model {
  static init(sequelize) {
    super.init({

      id_partida: DataTypes.INTEGER,

      id_user: DataTypes.INTEGER,

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
