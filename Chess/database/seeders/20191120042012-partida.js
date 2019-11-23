'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('partida', [
      {
        id: 1,
        fen: 'r1b2r2/pppp2pk/2nN4/4p2Q/2Bq4/8/PPPP2K1/RNB5 b - - 1 15',
        author_color: 'b',
        winner: 1,
        id_user_1: 1,
        id_user_2: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        fen: '4qrk1/1b6/p3Pp2/1pb2pp1/7P/6R1/PPP1Q1P1/3N3K b - h3 0 27',
        author_color: 'w',
        winner: null,
        id_user_1: 1,
        id_user_2: 3,
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
        fen: '8/8/8/3k4/8/8/8/2K5 b - - 0 64',
        author_color: 'w',
        winner: null,
        id_user_1: 3,
        id_user_2: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        fen: '',
        author_color: 'b',
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
