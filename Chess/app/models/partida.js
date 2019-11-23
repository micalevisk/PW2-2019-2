const { Model, DataTypes } = require('sequelize');

class Partida extends Model {
  static init(sequelize) {
    super.init({

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

  static associate(models) {
    this.belongsTo(models.user, { foreignKey: 'id_user_1', as: 'userOwner' });
    this.belongsTo(models.user, { foreignKey: 'id_user_2', as: 'userOpponent' });
    this.belongsTo(models.user, { foreignKey: 'id_winner', as: 'winner' });
  }
}

module.exports = Partida;
