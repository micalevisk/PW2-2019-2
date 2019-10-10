'use strict';
module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define('area', {
    name: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
  });
  area.associate = function(models) {
    area.hasOne(models.curso, {
      foreignKey: 'id_area',
    });
  };
  return area;
};
