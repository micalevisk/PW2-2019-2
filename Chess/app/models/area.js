'use strict';
module.exports = (sequelize, DataTypes) => {
  const area = sequelize.define('area', {
    name: DataTypes.STRING
  }, {
    // The name of the model. The model will be stored in `sequelize.models` under this name.
    // This defaults to class name i.e. Bar in this case. This will control name of auto-generated
    // foreignKey and association naming:
    modelName: 'area',

    // Will automatically set field option for all attributes to snake cased name.
    // Does not override attribute with field option already defined:
    underscored: true,

    // Disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following:
    freezeTableName: true,

    // Define the table's name:
    tableName: 'area',
  });

  area.associate = function(models) {
    area.hasOne(models.curso, {
      foreignKey: 'id_area',
    });
  };

  return area;
};
