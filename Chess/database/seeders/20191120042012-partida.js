'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('partida', [
      {// partida com vitória do jogador preto
        id: 1,
        fen: 'r1b2r2/pppp2pk/2nN4/4p2Q/2Bq4/8/PPPP2K1/RNB5 b - - 1 15',
        author_color: 'b',
        winner: 1,
        id_user_1: 1,
        id_user_2: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {// partida em andamento criada pelo jogador branco
        id: 2,
        fen: '4qrk1/1b6/p3Pp2/1pb2pp1/7P/6R1/PPP1Q1P1/3N3K b - h3 0 27',
        author_color: 'w',
        winner: null,
        id_user_1: 1,
        id_user_2: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {// partida esperando oponente, criada pelo jogador preto
        id: 3,
        fen: '',
        author_color: 'b',
        winner: null,
        id_user_1: 2,
        id_user_2: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {// partida emptada
        id: 4,
        fen: '8/8/8/3k4/8/8/8/2K5 b - - 0 64',
        author_color: 'w',
        winner: null,
        id_user_1: 3,
        id_user_2: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {// partida esperando oponente, criada pelo jogador branco
        id: 5,
        fen: '',
        author_color: 'w',
        winner: null,
        id_user_1: 3,
        id_user_2: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {// partida em que o jogador preto pode promover um peão (a2-a1) e o branco vencer
        id: 6,
        fen: '2q1kbnr/2pppppp/8/3P1P2/8/5N2/p5rP/2K3R1 b k - 1 17',
        author_color: 'w',
        winner: null,
        id_user_1: 1,
        id_user_2: 2,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('partida', null, {});
  }
};
