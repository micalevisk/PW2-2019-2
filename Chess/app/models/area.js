const { Model, DataTypes } = require('sequelize');

const { capitalize } = require('../../lib/utils');

class Area extends Model {
  static init(sequelize) {
    super.init({

      name: DataTypes.STRING,

    }, {
      sequelize,
      modelName: 'area',
      freezeTableName: true,
      underscored: true,
      hooks: {
        beforeSave(area) {
          area.name = capitalize(area.name);
        },
      },
    });
  }

  static associate(models) {
    this.hasOne(models.curso, { foreignKey: 'id_area' });
  }
}

module.exports = Area;
