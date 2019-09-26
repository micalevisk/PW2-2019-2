'use strict';
module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define('area', {
    name: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
  });
  area.associate = function(models) {
    // associations can be defined here
  };
  return area;
};
