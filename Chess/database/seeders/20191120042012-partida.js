'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('partida', [
      {
        id: 1,
        fen: '8/8/8/8/8/5K2/1k4p1/4q3 w - - 0 73',
        author_color: 'b',
        winner: null,
        id_user_1: 1,
        id_user_2: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        fen: '',
        author_color: 'w',
        winner: null,
        id_user_1: 1,
        id_user_2: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        fen: '',
        author_color: 'b',
        winner: null,
        id_user_1: 2,
        id_user_2: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        fen: '',
        author_color: 'w',
        winner: null,
        id_user_1: 3,
        id_user_2: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('partida', null, {});
  }
};
