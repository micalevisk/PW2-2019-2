'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('partida', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user_1: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_user_2: {
        allowNull: true, // Se `NULL` então a partida não tem oponente definido
        type: Sequelize.INTEGER
      },
      id_winner: {
        allowNull: true, // Se `NULL` então a partida não foi finalizada ou resultou em empate
        type: Sequelize.INTEGER
      },
      fen: {
        allowNull: false,
        type: Sequelize.STRING
      },
      author_color: {
        allowNull: false,
        type: Sequelize.ENUM('w', 'b')
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('partida');
  }
};
