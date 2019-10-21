const { Model, DataTypes } = require('sequelize');

class Area extends Model {
  static init(sequelize) {
    super.init({

      name: DataTypes.STRING,

    }, {
      sequelize,
      modelName: 'area',
      freezeTableName: true,
      underscored: true,
    });
  }

  static associate(models) {
    this.hasOne(models.curso, { foreignKey: 'id_area' });
  }
}

module.exports = Area;
