'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([

      queryInterface.addConstraint('mensagem', ['id_partida'], {
        type: 'foreign key',
        name: 'mensagem_id_partida_fk',
        references: {
          table: 'partida',
          field: 'id',
        },
        onDelete: 'restrict',
        onUpdate: 'restrict',
      }),

      queryInterface.addConstraint('mensagem', ['id_user'], {
        type: 'foreign key',
        name: 'mensagem_id_user_fk',
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
        'mensagem',
        'mensagem_id_partida_fk',
      ),

      queryInterface.removeConstraint(
        'mensagem',
        'mensagem_id_user_fk',
      ),

    ]);
  }
};
