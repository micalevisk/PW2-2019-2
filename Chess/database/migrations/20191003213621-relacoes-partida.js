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

      queryInterface.addConstraint('partida', ['winner'], {
        type: 'foreign key',
        name: 'partida_winner_fk',
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
    // TODO:
  }
};
