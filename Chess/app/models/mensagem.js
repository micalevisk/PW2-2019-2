const { Model, DataTypes } = require('sequelize');

class Mensagem extends Model {
  static init(sequelize) {
    super.init({

      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },

    }, {
      sequelize,
      modelName: 'mensagem',
      freezeTableName: true,
      underscored: true,
    });
  }

  static associate(models) {
    this.belongsTo(models.partida, { foreignKey: 'id_partida', as: 'partida' });
    this.belongsTo(models.user, { foreignKey: 'id_user', as: 'user' });
  }
}

module.exports = Mensagem;
