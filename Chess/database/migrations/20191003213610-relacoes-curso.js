'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('curso', ['id_area'], {
      type: 'foreign key',
      name: 'curso_id_area_fk',
      references: {
        table: 'area',
        field: 'id',
      },
      onDelete: 'restrict',
      onUpdate: 'restrict',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'curso', // Tabela da FK
      'curso_id_area_fk', // Nome da FK
    );
  }
};
