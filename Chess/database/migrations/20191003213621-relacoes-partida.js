'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([

      queryInterface.addConstraint('partida', ['id_user_1'], {
        type: 'foreign key',
        name: 'partida_id_user_1_fk',
        references: {
          table: 'user',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),

      queryInterface.addConstraint('partida', ['id_user_2'], {
        type: 'foreign key',
        name: 'partida_id_user_2_fk',
        references: {
          table: 'user',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([

      queryInterface.removeConstraint(
        'partida', // Tabela da FK
        'partida_id_user_1_fk', // Nome da FK
      ),

      queryInterface.removeConstraint(
        'partida', // Tabela da FK
        'partida_id_user_2_fk', // Nome da FK
      ),

    ]);
  }
};
